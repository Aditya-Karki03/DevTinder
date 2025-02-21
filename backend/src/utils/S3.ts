import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
//we will store each image inside a folder called  devAmorProfilePicture
//each image will named as userId & date.now
//instead of

export const uploadToS3 = async ({
  fileName,
  userId,
  contentType,
}: {
  fileName: string;
  userId: string;
  contentType: string;
}) => {
  const credentials = {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? "",
    secretAccessKey: process.env.AWS_S3_SECRET_KEY ?? "",
  };
  const config = {
    region: process.env.AWS_S3_REGION ?? "",
    credentials,
  };
  const s3 = new S3Client(config);
  const BUCKET = process.env.AWS_BUCKET || "";
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: `user-uploads/ProfilePicture/${userId}/${fileName}`,
    ContentType: contentType,
  });
  try {
    const url = await getSignedUrl(s3, command, {
      expiresIn: 60, //1 min expiry
    });
    return url;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong, while creating URL");
  }
};
