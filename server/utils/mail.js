const { ownerMail, passw } = require("../config");
const nodemailer = require("nodemailer");
// Configure Nodemailer for email notifications
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: ownerMail,
    pass: passw,
  },
});

// Function to send email notifications
const sendEmail = async (email, subject, message) => {
  const mailOptions = {
    from: ownerMail,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send notification: ${error.message}`);
  }
};
module.exports = sendEmail;
