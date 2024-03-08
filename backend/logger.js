const winston = require('winston');
const moment = require('moment');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `logs/logs_${moment().format('DD-MM-YYYY')}.log`
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp, route }) => {
      return ` ${route || ''} ${level}: ${message} ${timestamp}`;
    })
  ),
});

module.exports = logger;


