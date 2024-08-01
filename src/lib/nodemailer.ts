import { createTransport } from "nodemailer";

const transporter = createTransport({
  //@ts-ignore
  host: process.env.SMTP_HOST_ID,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async ({
  toEmail,
  subject,
  emailBody,
}: {
  toEmail: string;
  subject: string;
  emailBody: any;
}) => {
  const EmailOption = {
    from: "My Notion <mynotion@gmail.com>",
    to: toEmail,
    subject: subject,
    html: emailBody,
  };

  try {
    await transporter.sendMail(EmailOption);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email sent Fail");
    console.log(error);
  }
};

export { sendEmail };
