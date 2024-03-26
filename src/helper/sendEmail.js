const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const { sendGridKey, senderEmail } = require("../utility/config");
sgMail.setApiKey(sendGridKey);

/**
 * @description - This function is used to send the emails
 */

const sendEmail = async ({ to, from = senderEmail, subject, html }) => {

  console.log(from, "====>from")
  console.log(to, "====>to")

  return new Promise(async (resolve, reject) => {
    try {
      const mailOptions = {
        to,
        from,
        subject,
        html,
      };
      const data = await sgMail.send(mailOptions);

      console.log("email send sucessfully", data);
      resolve(data);
    } catch (error) {
      logger.error("error", error.message);
      reject(error);
    }
  });
};

module.exports = { sendEmail };
