import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { BoardModel } from "../src/logic/model/BoardModel";
import { TumblerPartType } from "../src/logic/TumblerTypes";
var cors = require("cors");

const CLIENT_ID = "354253354749-bfp5ial5k53abr4o9q5c44f66nbnkjrn.apps.googleusercontent.com";

////////////////////
dotenv.config();

mongoose.set("useFindAndModify", false);

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    /*const user: IUser = await User.create({
      email: 'bill@microsoft.com',
      firstName: 'Bill',
      lastName: 'Gates'
    });*/

    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
};

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  levels: [
    {
      type: String,
    },
  ],
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  levels: Array<string>;
}

const UserModel = mongoose.model<User>("User", userSchema);

const boardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  inner: {
    columns: {
      type: Number,
      min: 3,
      max: 31,
      required: true,
    },
    rows: {
      type: Number,
      min: 3,
      max: 31,
      required: true,
    },
    blueBallsInDispenser: {
      type: Number,
      min: 0,
      max: 18,
      required: true,
    },
    redBallsInDispenser: {
      type: Number,
      min: 0,
      max: 18,
      required: true,
    },
    parts: [
      [
        {
          partType: {
            type: Number,
            min: 0,
            max: TumblerPartType.__LENGTH - 1,
            required: true,
          },
          facingLeft: {
            type: Boolean,
            required: true,
          },
        },
      ],
    ],
  },
});

export interface BoardDocument extends mongoose.Document {
  userId: string;
  inner: BoardModel;
}

const BoardDBModel = mongoose.model<BoardDocument>("Board", boardSchema);

const saveBoard = async (boardDoc: any): Promise<Boolean> => {
  let tmp = new BoardDBModel(boardDoc);
  let valerr = tmp.validateSync();
  if (!!valerr) {
    console.log(valerr.name, valerr.message);
    return false;
  }

  let res = await BoardDBModel.findOneAndUpdate({ userId: boardDoc.userId }, boardDoc, { upsert: true, setDefaultsOnInsert: true });
  console.log(res);
  return !!res;
};

const loadBoard = async (user: string): Promise<any> => {
  let board = await BoardDBModel.findOne({ userId: user });
  console.log(board);
  return board;
};

const createUser = async (userDoc: any) => {
  let u = new UserModel(userDoc);
  await u.save();
};

const overwriteUser = async () => {
  return await UserModel.findOneAndUpdate({ id: "456" }, { name: "newnameww" }, { upsert: true, setDefaultsOnInsert: true });
  //await createUser(userDoc);
};

const createUserTest = async () => {
  await createUser({
    id: "123",
    name: "alpha",
    levels: ["aa", "bb", "cc"],
  })
    .then(() => {
      console.log("user saved");
    })
    .catch((reason) => {
      console.error("failed to save user to DB");
      console.error(reason);
    });

  /*await createUser({
    apa: 536,
    })
  .then(() => {
    console.log("user saved2");
  })
  .catch((reason) => {
    console.error("failed to save user to DB2");
    console.error(reason);
  });*/

  let res = await overwriteUser()
    .then((r) => {
      console.log("user overwritten");
      console.log(r);
    })
    .catch((reason) => {
      console.error("failed to overwrite user");
      console.error(reason);
    });
  console.log(res);
};

connectMongo().then(() => {
  createUserTest();
});

////////////////////

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());

const client = new OAuth2Client(CLIENT_ID);

const verifyToken = async (token: string) =>
  client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

async function getUser(token: any): Promise<string> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload ? payload["sub"] : "";
  return userid;
}

async function getUserFromHeader(req: express.Request): Promise<string> {
  const bearerHeader = req.headers["authorization"];

  const bearer = bearerHeader!.split(" ");
  const bearerToken = bearer[1];
  let token = bearerToken;

  return getUser(token);
}

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

const verifyTokenInHeader = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let token = "notoken";
  let ok = false;
  let status = 403;

  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      token = bearerToken;
    }
  } catch (error) {
    console.error(error);
  }

  try {
    await verifyToken(token);
    ok = true;
  } catch (error) {
    console.error(error);
  }

  if (ok) {
    next();
  } else {
    res.status(403).send("Failed to verify JWT token");
  }
};

app.post("/api/secure", verifyTokenInHeader, async (req, res) => {
  let status = 403;

  let user = await getUserFromHeader(req);

  let bod = req.body;
  console.log(bod);

  status = 200;
  res.status(status).json({
    message: "yooo!" + user,
  });
});

app.post("/api/saveboard", verifyTokenInHeader, async (req, res) => {
  let user = await getUserFromHeader(req);

  let status = 403;
  let msg = "failed to save board for " + user;

  // let bod = JSON.stringify(req.body);
  // console.log(bod);

  //let doc = {userId: user, inner: bod};
  let doc = { userId: user, inner: req.body };

  if (await saveBoard(doc)) {
    status = 200;
    msg = "board saved for " + user;
  }

  res.status(status).json({
    message: msg,
  });
});

app.get("/api/loadboard", verifyTokenInHeader, async (req, res) => {
  console.log("load board 1");
  let user = await getUserFromHeader(req);

  let status = 403;
  let retval = null;

  let board = await loadBoard(user);
  if (!!board?.inner) {
    status = 200;
    retval = board.inner;
  }

  console.log("load board 2");
  res.status(status).json(retval);
});

app.listen(5000, () => console.log("Server started on port 5000"));
