// import before any other module
import './bootstrap';

import app from './app';
import config from './providers/config';
import log from './providers/log';

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

function exit(code: number) {
  setImmediate(() => {  // to allow logger messages to process
    process.exit(code);
  });
}
