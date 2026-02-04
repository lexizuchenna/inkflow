import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/smtp-transport";

const send_mail = async (mailOptions: MailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV !== "development",
      },
    });

    const info = await transporter.sendMail({
      from: `InkFlow <${process.env.SMTP_USER}>`,
      ...mailOptions,
    });

    return { error: null, status: 200 };
  } catch (error: any) {
    console.error("send-mail: ", error);
    return { status: 500, error };
  }
};

export default send_mail;
