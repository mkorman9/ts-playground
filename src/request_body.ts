import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

interface RequestWithParsedBody extends Request {
  parsedBody: unknown;
}

export const bindRequestBody = (t: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = t.parse(req.body);

      const reqWithBody = req as RequestWithParsedBody;
      reqWithBody.parsedBody = body;
    } catch (err) {
      return res.status(400).send('Malformed request payload');
    }

    next();
  };
};

export const getRequestBody = <T>(req: Request) => {
  return (req as RequestWithParsedBody).parsedBody as T;
};
