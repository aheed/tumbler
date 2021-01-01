import express from 'express';
import jwt from 'jsonwebtoken';

const app: express.Application = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the APIzz'
  });
});

app.listen(5000, () => console.log('Server started on port 5000'));