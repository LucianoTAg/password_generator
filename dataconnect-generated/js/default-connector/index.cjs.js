const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'password_generator',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

