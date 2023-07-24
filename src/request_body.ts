import { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { validationResult } from 'express-validator';

interface RequestWithValidatedBody extends Request {
  validatedBody: unknown;
}

export const bindRequestBody = (schema: z.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        error: 'Request validation error',
        violations: validationErrors.array().map(e => ({
          field: e.type === 'field' ? e.path : undefined,
          code: e.msg
        }))
      });
    }

    try {
      (req as RequestWithValidatedBody).validatedBody = schema.parse(req.body);
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
  return (req as RequestWithValidatedBody).validatedBody as T;
};
