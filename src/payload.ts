import { Request, Response, NextFunction } from 'express';
import { ZodType, z } from 'zod';

const REQUEST_BODY_PARAM = 'requestBodyParsed';

export const PayloadRequestSchema = z.object({
  name: z.string(),
  age: z.number(),
  timestamp: z.coerce.date()
});

export type PayloadRequest = z.infer<typeof PayloadRequestSchema>;

export const requestBodyMiddleware = (t: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = t.parse(req.body);
      (req as any)[REQUEST_BODY_PARAM] = body;
    } catch (err) {
      return res.status(400).send('Malformed request payload');
    }

    next();
  };
};

export const getRequestBody = <T>(req: Request) => {
  return (req as any)[REQUEST_BODY_PARAM] as T;
};
