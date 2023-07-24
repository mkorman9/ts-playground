import { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { validationResult } from 'express-validator';

type RequestWithValidatedBody = Request & {
  validatedBody: unknown;
};

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

    schema.parseAsync(req.body)
      .then(validatedBody => {
        (req as RequestWithValidatedBody).validatedBody = validatedBody;
        next();
      })
      .catch(() => {
        res.status(400).json({
          error: 'Malformed request payload',
          violations: []
        });
      });
  };
};

export const getRequestBody = <T>(req: Request) => {
  return (req as RequestWithValidatedBody).validatedBody as T;
};
