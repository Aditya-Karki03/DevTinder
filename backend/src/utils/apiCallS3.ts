import axios from "axios";

export const apiCallToUpload = async (url: string, file: any) => {
  try {
    const response = await axios.put(
      url,
      {
        data: file,
      },
      {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong, while making api call to S3");
  }
};
