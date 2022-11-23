const nodemailer = require("nodemailer");
const config = require("./config/auth.config.js");

const user = config.user;
const pass = config.pass;
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: user,
    pass: pass,
  },
});

const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>SE3316 Lab4 Signup Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports = sendConfirmationEmail;
