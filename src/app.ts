import express, { NextFunction, Request, Response } from 'express';
import { findPublicIp } from './ip';
import { getRequestBody, bindRequestBody } from './request_body';
import { z } from 'zod';

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Request parsing error',
    });
  }

  next(err);
});

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

const PayloadRequestSchema = z.object({
  name: z.string(),
  age: z.number().min(1),
  timestamp: z.coerce.date()
});

type PayloadRequest = z.infer<typeof PayloadRequestSchema>;

app.put('/payload', bindRequestBody(PayloadRequestSchema), (req: Request, res: Response) => {
  const body = getRequestBody<PayloadRequest>(req);
  res.status(200).json(body);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  
  console.error(err);

  res.status(500).json({
    error: 'Internal server error',
  });
});

export default app;
