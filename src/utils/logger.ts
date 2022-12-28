import { createLogger, format, transports } from 'winston';
import { APP_ENV_DEV } from '.';
const env = process.env.APP_ENV;
const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.align(),
  env === APP_ENV_DEV ? format.colorize({ all: true }) : undefined,
  format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`),
);

const plugin =
  env !== APP_ENV_DEV
    ? [
        new transports.File({
          filename: 'logs/info.log',
          level: 'info',
          format: format.combine(
            format.printf((i) =>
              i.level === 'info'
                ? `${i.level}: ${i.timestamp} ${i.message}`
                : '',
            ),
          ),
        }),
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
      ]
    : [];
const logger = createLogger({
  format: customFormat,
  transports: [new transports.Console(), ...plugin],
});

export default logger;
