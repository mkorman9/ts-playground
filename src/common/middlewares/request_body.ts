import { NextFunction, Request, Response } from 'express';
import z, { ZodError, ZodIssue } from 'zod';

type RequestWithValidatedBody<T> = Request & {
  validatedBody: T;
};

export function bindRequestBody(schema: z.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parseAsync(req.body)
      .then(vb => {
        (req as RequestWithValidatedBody<typeof vb>).validatedBody = vb;
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
}

export function getRequestBody<T>(req: Request) {
  return (req as RequestWithValidatedBody<T>).validatedBody;
}

function joinPath(parts: (string | number)[]) {
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
}

function mapIssueCode(issue: ZodIssue) {
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
