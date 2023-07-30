import dayjs from 'dayjs';
import { NextFunction, Request, Response, Router } from 'express';
import { z } from 'zod';
import { bindRequestBody, getRequestBody } from './middlewares/request_body';
import { findPublicIp } from './providers/ip';
import templates from './providers/templates';

const api = Router();

const PayloadRequestSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().min(1),
  timestamp: z.coerce.date()
});

type PayloadRequest = z.infer<typeof PayloadRequestSchema>;

api.get('/', (req: Request, res: Response, next: NextFunction) => {
  templates
    .render('index.html', {
      now: dayjs(),
      numbers: [1, 2]
    })
    .then(content => {
      res.status(200).set('Content-Type', 'text/html').send(content);
    })
    .catch(err => next(err));
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

api.put('/payload',
  bindRequestBody(PayloadRequestSchema),
  (req: Request, res: Response) => {
    const body = getRequestBody<PayloadRequest>(req);
    res.status(200).json(body);
  }
);

api.get('/error', (req: Request, res: Response) => {
  throw new Error('Error in request handler!');
});

api.get('/health/readiness', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy'
  });
});

api.get('/health/liveness', (req: Request, res: Response) => {
  // TODO: verify health

  res.status(200).json({
    status: 'healthy'
  });
});

export default api;
