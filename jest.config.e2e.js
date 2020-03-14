const base = require('./jest.config')

module.exports = {
  ...base,
  testRegex: 'tests/e2e/.*\\.(test|spec)\\.(js|ts(x?))$'
}
