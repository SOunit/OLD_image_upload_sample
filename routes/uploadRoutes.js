const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/dev');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
});

module.exports = (app) => {
  app.get('/api/upload', (req, res) => {
    res.send({ api: 'api' });
  });
};
