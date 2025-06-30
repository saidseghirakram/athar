/** @format */

import transporter from "./nodemailer";

function emailTemplate(contactProps: ContactProps) {
  const { name, email, subject, content } = contactProps;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Message</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      font-family: Arial, sans-serif;
      color: #1f2937;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        border: 1px solid #e5e7eb;
      "
    >
      <!-- Header -->
      <div
        style="
          background-color: #2563eb;
          color: #ffffff;
          padding: 24px;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        "
      >
        <h1 style="margin: 0; font-size: 22px; font-weight: 600">
          New Message from Your Portfolio
        </h1>
      </div>

      <!-- Content -->
      <div style="padding: 32px">
        <!-- Contact Details -->
        <div style="margin-bottom: 28px">
          <h2
            style="
              color: #2563eb;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 16px 0;
            "
          >
            Contact Details
          </h2>
          <div style="margin-bottom: 12px"><strong>Name:</strong> ${name}</div>
          <div style="margin-bottom: 12px">
            <strong>Email:</strong> ${email}
          </div>
          <div><strong>Subject:</strong> ${subject}</div>
        </div>

        <!-- Message -->
        <div>
          <h2
            style="
              color: #2563eb;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 16px 0;
            "
          >
            Message
          </h2>
          <div
            style="
              background-color: #f3f4f6;
              padding: 16px;
              border-left: 3px solid #2563eb;
              border-radius: 8px;
              color: #1f2937;
            "
          >
            ${content}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        style="
          background-color: #f3f4f6;
          color: #4b5563;
          padding: 20px;
          font-size: 13px;
          text-align: center;
          border-top: 1px solid #d1d5db;
        "
      >
        <p style="margin: 0; opacity: 0.8">
          This message was submitted via your portfolio contact form.
        </p>
      </div>
    </div>
  </body>
</html>

    `;

  return htmlContent;
}

export default async function sendEmail(emailProps: ContactProps) {
  const to = process.env.EMAIL_USER;
  if (!emailProps || !to) throw new Error("messing email props data");
  const htmlContent = emailTemplate(emailProps);

  const mailOptions = {
    from: `${emailProps.name} <${emailProps.email}>`,
    to: process.env.EMAIL_USER,
    subject: emailProps.subject,
    html: htmlContent,
  };

  try {
    transporter.sendMail(mailOptions);
    console.log("email sent successfully");
  } catch (error) {
    throw new Error("Error sending  email");
  }
}
