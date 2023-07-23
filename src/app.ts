import express, { NextFunction, Request, Response } from 'express';
import { findPublicIp } from './ip';

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    hello: 'world!'
  });
});

app.get('/ip', (req: Request, res: Response, next: NextFunction) => {
  findPublicIp()
    .then(ip => {
      res.status(200).json({
        ip: ip
      });
    })
    .catch(err => next(err));
});

export default app;
