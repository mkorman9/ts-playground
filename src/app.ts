import express, { NextFunction, Request, Response } from 'express';
import { findPublicIp } from './ip';
import { PayloadRequest, PayloadRequestSchema, getRequestBody, requestBodyMiddleware } from './payload';

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

app.put('/payload', requestBodyMiddleware(PayloadRequestSchema), (req: Request, res: Response) => {
  const body = getRequestBody<PayloadRequest>(req);
  res.status(200).json(body);
});

export default app;
