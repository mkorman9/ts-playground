import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { FieldValidationError, validationResult } from 'express-validator';

interface RequestWithParsedBody extends Request {
  parsedBody: unknown;
}

export const bindRequestBody = (t: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        error: 'Request validation error',
        violations: validationErrors.array().map(e => ({
          field: (e as FieldValidationError).path,
          code: e.msg
        }))
      });
    }

    try {
      const body = t.parse(req.body);

      const reqWithBody = req as RequestWithParsedBody;
      reqWithBody.parsedBody = body;
    } catch (err) {
      return res.status(400).json({
        error: 'Malformed request payload',
        violations: []
      });
    }

    next();
  };
};

export const getRequestBody = <T>(req: Request) => {
  return (req as RequestWithParsedBody).parsedBody as T;
};
