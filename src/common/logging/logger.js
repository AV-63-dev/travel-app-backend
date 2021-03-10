const { createLogger, transports, format, config } = require('winston');
const { combine, timestamp, json, prettyPrint, colorize, printf } = format;

const errorTransports = [
  new transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: combine(timestamp(), json(), prettyPrint()),
  }),
];

const infoFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const infoTransports = [
  new transports.Console({
    level: 'info',
    format: combine(timestamp(), colorize(), infoFormat),
  }),
  new transports.File({
    level: 'info',
    filename: 'logs/info.log',
    format: combine(timestamp(), json(), prettyPrint()),
  }),
];

const logger = createLogger({
  levels: config.syslog.levels,
  transports: [...errorTransports, ...infoTransports],
  exceptionHandlers: [
    new transports.File({
      filename: 'logs/error.log',
      format: combine(timestamp(), json(), prettyPrint()),
    }),
  ],
  rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
});

module.exports = logger;
