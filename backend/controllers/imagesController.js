const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const s3 = new S3Client({
    region: bucketRegion
});

const getImageURL = async (req, res) => {
   const imageName = req.params.imageName.replace('+', '/');
    console.log(imageName)
   try {
        const getObjectParams = {
            Bucket: bucketName,
            Key: imageName
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        res.status(200).json(url)
    } catch(err) {
        res.status(400).json({'Error': 'Could not get image url.'})
        console.error(err);
    }
}
   
module.exports = {
    getImageURL
}