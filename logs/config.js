const winston = require('winston');
const fs = require('fs');
const env = 'development'    //process.env.NODE_ENV || 'development';
const logDir = './logs';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/log.js`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});
/*
logger.info('init logger    info'); vert + console
logger.warn('init logger warning'); orange + console
logger.debug('init logger  debug'); pas sur console
logger.error('init logger  error'); rouge + console
*/
module.exports = logger;