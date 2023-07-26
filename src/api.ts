import { NextFunction, Request, Response, Router } from 'express';
import { z } from 'zod';
import { bindRequestBody, getRequestBody } from './request_body';
import { findPublicIp } from './ip';

const api = Router();

const PayloadRequestSchema = z.object({
  name: z.string(),
  age: z.number().min(1),
  timestamp: z.coerce.date()
});

type PayloadRequest = z.infer<typeof PayloadRequestSchema>;

api.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    hello: 'world!'
  });
});

api.get('/ip', (req: Request, res: Response, next: NextFunction) => {
  findPublicIp()
    .then(ip => {
      res.status(200).json({
        ip: ip
      });
    })
    .catch(err => next(err));
});

api.put('/payload', bindRequestBody(PayloadRequestSchema), (req: Request, res: Response) => {
  const body = getRequestBody<PayloadRequest>(req);
  res.status(200).json(body);
});

api.get('/error', (req: Request, res: Response) => {
  throw new Error('Error in request handler!');
});

export default api;
