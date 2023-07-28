import { WinstonGraylog } from '@pskzcompany/winston-graylog';
import winston from 'winston';
import config from './config';

const remoteTransports: winston.transport[] = [];

if (config.GELF_ADDRESS) {
  remoteTransports.push(
    new WinstonGraylog({
      graylog: config.GELF_ADDRESS,
      defaultMeta: {
        facility: 'ts-playground'
      }
    })
  );
}

export default winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console(), ...remoteTransports],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    winston.format.printf(info => {
      if (info.stack) {
        return `${info.timestamp} | ${info.level} | ${info.message}: ${info.stack}`;
      }

      return `${info.timestamp} | ${info.level} | ${info.message}`;
    })
  )
});
