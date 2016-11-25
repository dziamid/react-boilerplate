import aws from 'aws-sdk';
import config from 'config';

aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});

export default {
  sign(filename, filetype) {
    return new Promise((resolve, reject) => {
      const s3 = new aws.S3();
      const params = {
        Bucket: config.bucketName,
        Key: filename,
        Expires: 60,
        ContentType: filetype
      };

      s3.getSignedUrl('putObject', params, function(err, data) {
        if (err) {
          console.log('error', err);
          reject(error);
        } else {
          console.log('data', data);
          resolve(data);
        }
      });
    })
  }
};
