const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

const sendForgotPasswordEmail = async (to, link) => {
  try {
    await transporter.sendMail({
      from: `"WanderLog" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Password Reset Request",
      text: `You requested a password reset.\n\nClick here: ${link}\n\nThis link expires in 30 minutes.`,
    });
    console.log("✅ Forgot password email göndərildi:", to);
  } catch (err) {
    console.error("❌ Email göndərilərkən xəta:", err);
    throw err;
  }
};

const sendUnlockAccountEmail = async (to, fullName, link) => {
  try {
    await transporter.sendMail({
      from: `"WanderLog" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Account Unlock Request",
      text: `Hi ${fullName},\n\nYour account is locked. Click here to unlock: ${link}\n\nThis link expires in 6 hours.`,
    });
    console.log("✅ Unlock account email göndərildi:", to);
  } catch (err) {
    console.error("❌ Email göndərilərkən xəta:", err);
    throw err;
  }
};

module.exports = {
  sendForgotPasswordEmail,
  sendUnlockAccountEmail,
};
