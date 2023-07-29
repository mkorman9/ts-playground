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
  process.exit(1);
});

process.on('SIGINT', () => {
  if (!server.listening) {
    return;
  }

  server.close(() => {
    log.info('Server shutdown complete');
    process.exit(0);
  });

  setTimeout(() => {
    log.error('Timeout when closing the server');
    process.exit(1);
  }, 5000);
});
