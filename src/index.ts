// import before any other module
import './error_handlers';
import config from './providers/config';

import app from './app';
import log from './providers/log';

app.listen(config.HTTP_PORT, config.HTTP_HOST, () => {
  log.info(`Listening on ${config.HTTP_HOST}:${config.HTTP_PORT}`);
});
