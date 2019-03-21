/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const pageContainers = fs.readdirSync(path.resolve(process.cwd(), 'app/containers'));

function componentExists(comp) {
  return pageContainers.indexOf(comp) >= 0;
}

module.exports = componentExists;
