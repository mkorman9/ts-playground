import express, { Request, Response } from 'express';

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

export default app;
