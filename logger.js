/* eslint-disable no-console */

const chalk = require('chalk').default;

const logger = {
  log: (...args) => {
    if (argv.verbose) {
      console.log(chalk.gray('VERBOSE:'), ...args);
    }
  },
  info: (...args) => {
    console.log(chalk.bold(chalk.blueBright('INFO:')), ...args);
  },
  warn: (...args) => {
    console.warn(chalk.bold(chalk.yellowBright('WARN:')), ...args);
  },
  error: (...args) => {
    console.error(chalk.bold(chalk.redBright('ERROR:')), ...args);
  },
};


module.exports = {
  logger,
};
