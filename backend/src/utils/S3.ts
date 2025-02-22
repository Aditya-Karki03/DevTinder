import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
  GetObjectLockConfigurationCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
//we will store each image inside a folder called  devAmorProfilePicture
//each image will named as userId & date.now
//instead of

//configure the S3 client
const attachCredentials = () => {
  const credentials = {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? "",
    secretAccessKey: process.env.AWS_S3_SECRET_KEY ?? "",
  };
  const config = {
    region: process.env.AWS_S3_REGION ?? "",
    credentials,
  };
  return config;
};

export const uploadToS3 = async ({
  fileName,
  contentType,
  fileBuffer,
}: {
  fileName: string;
  contentType: string;
  fileBuffer: any;
}) => {
  // const credentials = {
  //   accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? "",
  //   secretAccessKey: process.env.AWS_S3_SECRET_KEY ?? "",
  // };
  // const config = {
  //   region: process.env.AWS_S3_REGION ?? "",
  //   credentials,
  // };
  // const s3 = new S3Client(config);
  const s3 = new S3Client({ ...attachCredentials() });
  const BUCKET = process.env.AWS_BUCKET || "";
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: `${fileName}`, //key name should be unique, if same name than s3 overwrites the prev one
    Body: fileBuffer,
    ContentType: contentType,
  });
  //to send the command we do
  await s3.send(command);
  // try {
  //   const url = await getSignedUrl(s3, command, {
  //     expiresIn: 60, //1 min expiry
  //   });
  //   return url;
  // } catch (error) {
  //   console.log(error);
  //   throw new Error("Something went wrong, while creating URL");
  // }
};

export const getPresignedUrls = async (key: string) => {
  const s3 = new S3Client({ ...attachCredentials() });
  const BUCKET = process.env.AWS_BUCKET || "";
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  const url = await getSignedUrl(s3, command, {
    expiresIn: 86400, //1 day is the expiration
  });
  return url;
};
