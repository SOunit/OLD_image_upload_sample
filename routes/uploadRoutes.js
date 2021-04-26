const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/dev');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
});

module.exports = (app) => {
  app.get('/api/upload', (req, res) => {
    // temp setting
    req.user = { id: 'test_id', name: 'test_user' };

    // image upload logic
    const key = `${req.user.id}/${uuid()}.jpeg`;
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'image-upload-sample-bucket',
        ContentType: 'jpeg',
        Key: key,
      },
      (err, url) => {
        res.send({ key, url });
      }
    );
  });
};
