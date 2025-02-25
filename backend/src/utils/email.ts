import nodemailer from "nodemailer";

interface emailProps {
  to: string;
  cc?: string[];
  data?: any;
}

export const sendOtpEmail = async (otp: string, toEmail: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: toEmail,
      subject: "OTP Verification - CodeBond",
      html: `<h1>Please Confirm your OTP</h1>
            <p>${otp}</p>
            <o>Valid for 2 minutes</p>
      `,
    });
    if (!info) {
      return {
        error: true,
        info: null,
      };
    }
    return {
      error: false,
      info,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      info: null,
    };
  }
};

// export default class Email{
//     to: string;
//     cc:string[] | undefined;
//     data:any;
//     from:string;
//     constructor({to,cc,data}:emailProps){
//         this.to=to;
//         this.cc=cc;
//         this.data=data;
//         this.from=`${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`
//     }
//     newTransport(){

//     }
// }
