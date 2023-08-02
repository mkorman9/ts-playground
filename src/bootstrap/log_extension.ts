import winston from 'winston';
import config from '../providers/config';
import WinstonGraylog from '@pskzcompany/winston-graylog';
import log from '../providers/log';

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
