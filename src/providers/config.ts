import 'dotenv/config';
import log from './log';

const abort = (message: string): never => {
  log.error('Failed to start up', { stack: new Error(message).stack });
  process.exit(1);
};

export default {
  HTTP_HOST: process.env.HTTP_HOST || abort('Missing HTTP_HOST'),
  HTTP_PORT: parseInt(process.env.HTTP_PORT || '') || abort('Missing HTTP_PORT')
};
