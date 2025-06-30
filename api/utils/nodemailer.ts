/** @format */
import nodemailer from "nodemailer";


// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other email services
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
