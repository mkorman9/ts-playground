import { NextFunction, Request, Response } from 'express';
import z, { ZodError, ZodIssue } from 'zod';

type RequestWithValidatedBody = Request & {
  validatedBody: unknown;
};

export const bindRequestBody = (schema: z.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema
      .parseAsync(req.body)
      .then(validatedBody => {
        (req as RequestWithValidatedBody).validatedBody = validatedBody;
        next();
      })
      .catch(e => {
        if (e instanceof ZodError) {
          res.status(400).json({
            error: 'Request validation error',
            violations: e.issues.map(issue => ({
              field: joinPath(issue.path),
              code: mapIssueCode(issue)
            }))
          });
        } else {
          next(e);
        }
      });
  };
};

export const getRequestBody = <T>(req: Request) => {
  return (req as RequestWithValidatedBody).validatedBody as T;
};

const joinPath = (parts: (string | number)[]) => {
  return parts.reduce((acc: string, current: string | number) => {
    if (typeof current === 'number') {
      return `${acc}[${current}]`;
    } else {
      if (acc.length === 0) {
        return current;
      } else {
        return `${acc}.${current}`;
      }
    }
  }, '');
};

const mapIssueCode = (issue: ZodIssue) => {
  if (issue.code === 'invalid_type') {
    if (issue.received === 'undefined' && issue.expected !== 'undefined') {
      return 'required';
    }
  } else if (issue.code === 'invalid_string') {
    if (typeof issue.validation === 'string') {
      return issue.validation;
    }
  }

  return issue.code;
}
