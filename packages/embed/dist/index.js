/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const actionGenerator = require('./action/index.js');
const reducerGenerator = require('./reducer/index.js');
const sagaGenerator = require('./saga/index.js');
const selectorGenerator = require('./selector/index.js');
const typeGenerator = require('./type/index.js');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('action', actionGenerator);
  plop.setGenerator('reducer', reducerGenerator);
  plop.setGenerator('saga', sagaGenerator);
  plop.setGenerator('selector', selectorGenerator);
  plop.setGenerator('type', typeGenerator);
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(path.resolve(process.cwd(), `app/containers/${comp}`), fs.F_OK);
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
