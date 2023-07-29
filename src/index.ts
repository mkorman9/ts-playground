// import before any other module
import './error_handlers';
import config from './providers/config';

import app from './app';
import log from './providers/log';

const server = app.listen(config.HTTP_PORT, config.HTTP_HOST, () => {
  log.info(`Server started listening on ${config.HTTP_HOST}:${config.HTTP_PORT}`);
});

server.on('error', err => {
  log.error('Failed to start up the server', { stack: err.stack });
  setTimeout(() => process.exit(1), 250);
});

process.on('SIGINT', () => {
  if (!server.listening) {
    return;
  }

  server.close(() => {
    log.info('Server shutdown complete');
    setTimeout(() => process.exit(0), 250);
  });

  setTimeout(() => {
    log.error('Timeout when closing the server');
    setTimeout(() => process.exit(1), 250);
  }, 5000);
});
