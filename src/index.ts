// load config and fail fast in case of error
import config from './common/providers/config';

import app from './app';
import log from './common/providers/log';

const server = app.listen(config.HTTP_PORT, config.HTTP_HOST, () => {
  log.info(`Server started listening on ${config.HTTP_HOST}:${config.HTTP_PORT}`);
});

server.on('error', err => {
  log.error('Failed to start up the server', { stack: err.stack });
  exit(1);
});

process.on('SIGINT', () => {
  if (!server.listening) {
    return;
  }

  log.info('Received SIGINT');

  server.close(() => {
    log.info('Server shutdown complete');
    exit(0);
  });

  setTimeout(() => {
    log.error('Timeout when closing the server');
    exit(1);
  }, 5000);
});

process.on('uncaughtException', err => {
  log.error('Unhandled exception', { stack: err.stack });
});

process.on('unhandledRejection', reason => {
  if (reason instanceof Error) {
    log.error(`Unhandled Promise rejection`, { stack: reason.stack });
  } else {
    log.error(`Unhandled Promise rejection: ${reason}`);
  }
});

function exit(code: number) {
  setImmediate(() => {  // to allow logger messages to process
    process.exit(code);
  });
}
