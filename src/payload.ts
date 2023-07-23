import { Request, Response, NextFunction } from 'express';
import { ZodType, z } from 'zod';

export const PayloadRequestSchema = z.object({
  name: z.string(),
  age: z.number(),
  timestamp: z.coerce.date()
});

export type PayloadRequest = z.infer<typeof PayloadRequestSchema>;

interface RequestWithParsedBody extends Request {
  parsedBody: unknown;
}

export const requestBodyMiddleware = (t: ZodType) => {
  return (req: RequestWithParsedBody, res: Response, next: NextFunction) => {
    try {
      const body = t.parse(req.body);
      req.parsedBody = body;
    } catch (err) {
      return res.status(400).send('Malformed request payload');
    }

    next();
  };
};

export const getRequestBody = <T>(req: Request) => {
  return (req as RequestWithParsedBody).parsedBody as T;
};
