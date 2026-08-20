/* eslint-disable no-console */

/*================================================================================
 =
 = Licensed Materials - Property of BP3 Global
 =
 =  bpmnlint-plugin-bpmn-rules
 =
 = Copyright © BP3 Global Inc. 2026. All Rights Reserved.
 = This software is subject to copyright protection under
 = the laws of the United States, United Kingdom and other countries.
 =
 =================================================================================*/

const { styleText } = require('node:util');
const process = require('process');

const LOG_LEVELS = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
};

function isStringNullOrEmpty(strValue) {
  return strValue == null || strValue.trim() === '';
}

function isLogLevelEnabled(logLevel) {
  return (
    (!isStringNullOrEmpty(process.env.LOG_LEVEL) && Object.keys(LOG_LEVELS).includes(process.env.LOG_LEVEL.toLowerCase()) && LOG_LEVELS[process.env.LOG_LEVEL.toLowerCase()] <= logLevel) ||
    (isStringNullOrEmpty(process.env.LOG_LEVEL) && LOG_LEVELS.info <= logLevel)
  );
}

// Multiple styles are passed to styleText() as an array of formats. This needs
// Node >= 22.15.0 (see engines in package.json): earlier versions skip the
// colour-support check for the array form and leak ANSI escape codes into
// non-TTY output.
const logger = {
  debug: (...args) => {
    if (isLogLevelEnabled(LOG_LEVELS.debug)) {
      console.log(styleText('gray', 'DEBUG:'), ...args);
    }
  },
  info: (...args) => {
    if (isLogLevelEnabled(LOG_LEVELS.info)) {
      console.log(styleText(['blueBright', 'bold'], 'INFO:'), ...args);
    }
  },
  warn: (...args) => {
    if (isLogLevelEnabled(LOG_LEVELS.warn)) {
      console.warn(styleText(['yellowBright', 'bold'], 'WARN:'), ...args);
    }
  },
  error: (...args) => {
    if (isLogLevelEnabled(LOG_LEVELS.error)) {
      console.error(styleText(['redBright', 'bold'], 'ERROR:'), ...args);
    }
  },
};

module.exports = {
  logger,
};
