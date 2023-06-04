import nodemailer from "nodemailer";

export const sendLoginLink = async (email: string, url: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "ChatSphere 💬 <info@chatsphere.com>",
    to: email,
    subject: "Sign in to ChatSphere 💬",
    html: `<a href="${url}">Login</a>`,
  });
};
