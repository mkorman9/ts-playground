// import before any other module
import './error_handlers';
import config from './providers/config';

import app from './app';
import log from './providers/log';

const server = app.listen(config.HTTP_PORT, config.HTTP_HOST, () => {
  log.info(`Listening on ${config.HTTP_HOST}:${config.HTTP_PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    log.info('Closed server');
    process.exit(0);
  });

  setTimeout(() => {
    log.error('Timeout when closing the server');
    process.exit(1);
  }, 5000);
});
