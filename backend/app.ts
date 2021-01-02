import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = "354253354749-bfp5ial5k53abr4o9q5c44f66nbnkjrn.apps.googleusercontent.com";

const app: express.Application = express();

app.use(bodyParser.json());

const client = new OAuth2Client(CLIENT_ID);

async function verify(token: any): Promise<string> {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  const userid = payload ? payload['sub'] : '';
  return userid;
}



app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the APIzz'
  });
});


app.post('/api/secure', async (req, res) => {

  let verified = false;
  let msg = 'Failed to verify JWT token';
  let user = '';

  let token = req.body.id_token;
  
  try {
    user = await verify(token);
    msg = 'Welcome to the secure API ' + user;
    verified = true;
  } catch(error) {
    console.error(error);
  }
  

  res.json({
    message: msg
  });
});

app.listen(5000, () => console.log('Server started on port 5000'));