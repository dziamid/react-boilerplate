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
        ContentType: filetype,
      };

      s3.getSignedUrl('putObject', params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
};
