import WinstonGraylog from '@pskzcompany/winston-graylog';
import winston from 'winston';
import config from './config';
import log from './log';

if (process.env.NODE_ENV !== 'test') {
  if (config.GELF_ADDRESS) {
    log.add(
      new WinstonGraylog({
        graylog: config.GELF_ADDRESS,
        defaultMeta: {
          facility: 'ts-playground'
        },
        format: winston.format.json()
      })
    );
  }

  log.level = config.LOG_LEVEL;
}
