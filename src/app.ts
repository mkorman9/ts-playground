import express, { Request, Response } from 'express';
import { findPublicIp } from './ip';

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    hello: 'world!'
  });
});

app.get('/ip', async (req: Request, res: Response) => {
  const ip = await findPublicIp();
  res.status(200).json({
    ip: ip
  })
});

export default app;
