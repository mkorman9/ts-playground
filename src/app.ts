import express, { NextFunction, Request, Response } from 'express';
import { findPublicIp } from './ip';
import { getRequestBody, bindRequestBody } from './request_body';
import { z } from 'zod';
import { body } from 'express-validator';

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

const PayloadRequestSchema = z.object({
  name: z.string(),
  age: z.number(),
  timestamp: z.coerce.date()
});

type PayloadRequest = z.infer<typeof PayloadRequestSchema>;

const PayloadRequestValidators = [
  body('name')
    .exists().withMessage('required')
    .bail()
    .isString().withMessage('format'),
  body('age')
    .exists().withMessage('required')
    .bail()
    .isInt({ min: 1 }).withMessage('format'),
  body('timestamp')
    .exists().withMessage('required')
    .bail()
    .isISO8601().withMessage('format')
];

app.put(
  '/payload',
  ...PayloadRequestValidators,
  bindRequestBody(PayloadRequestSchema),
  (req: Request, res: Response) => {
    const body = getRequestBody<PayloadRequest>(req);
    res.status(200).json(body);
  }
);

export default app;
