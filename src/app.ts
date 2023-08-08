import express, { NextFunction, Request, Response } from 'express';
import './common/providers/dayjs_extensions';
import log from './common/providers/log';
import api from './module/api/api';

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Request parsing error'
    });
  }

  next(err);
});

app.use('/', api);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: 'Not found'
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  log.error(`Error when handling request ${req.method} ${req.path} (${req.ip})`, { stack: err.stack });

  res.status(500).json({
    error: 'Internal server error'
  });
});

export default app;
