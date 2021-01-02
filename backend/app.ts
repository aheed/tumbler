import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
var cors = require('cors')

const CLIENT_ID = "354253354749-bfp5ial5k53abr4o9q5c44f66nbnkjrn.apps.googleusercontent.com";

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());

const client = new OAuth2Client(CLIENT_ID);

const verifyToken = async (token: string) => client.verifyIdToken(
  {
    idToken: token,
    audience: CLIENT_ID
  });

async function getUser(token: any): Promise<string> {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  const userid = payload ? payload['sub'] : '';
  return userid;
}

async function getUserFromHeader(req: express.Request): Promise<string> {
  const bearerHeader = req.headers['authorization'];
    
  const bearer = bearerHeader!.split(' ');
  const bearerToken = bearer[1];
  let token = bearerToken;    

  return getUser(token);
}

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});


const verifyTokenInHeader = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let token = 'notoken';
  let ok = false;
  let status = 403;

  try {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      token = bearerToken;
      
    }
  } catch(error) {
    console.error(error);
  }

  try {
    await verifyToken(token);
    ok = true;
  } catch(error) {
    console.error(error);
  }

  if (ok) {
    next();
  }
  else {
    res.status(403).send('Failed to verify JWT token');
  }
}

app.post('/api/secure', verifyTokenInHeader, async (req, res) => {

  
  let status = 403;

  let user = await getUserFromHeader(req);

  let bod = req.body;
  console.log(bod);
  
  status = 200;
  res.status(status).json({
    message: 'yooo!' + user
  });
});

app.listen(5000, () => console.log('Server started on port 5000'));