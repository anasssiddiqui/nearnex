const { sendEmail, sendSesEmail } = require("../helper/sendEmail");
const emailTemplates = require("../templates/emailTemplates");
// const { sendSesEmail,sendEmail } = require("../../helper/sendEmail");
// const { baseUrl, senderEmail } = require('../utility/config')


/**
 * @description -This function sends otp email to the user with the email
 * @param {String} email - User regestered email
 * @param {Number} otp - User forgot email otp
 * @returns - promise reject or resolve
 */

const sendChangePasswordEmail = async ({ password, email }) => {

    // @TODO - create email template with dynamic otp 
    const { html, subject } = emailTemplates.changePasswordMessage({ password });

    // @TODO - Send email to user with nodemailer
    await sendEmail({ to: email, subject, html });

    return
};


/**
 * @description -This function sends otp email to the user with the email
 * @param {String} email - User regestered email
 * @param {Number} otp - User forgot email otp
 * @returns - promise reject or resolve
 */

const sendOtpEmail = async ({ otp, email }) => {

    // @TODO - create email template with dynamic otp 
    const { html, subject } = emailTemplates.forgetPasswordOtpMessage({ otp });

    // @TODO - Send email to user with nodemailer
    await sendEmail({ to: email, subject, html }).then(value => {
        console.log(value)
    })

    return
};

/**
 * @description -This function sends otp email to the user with the email
 * @param {String} email - User regestered email
 * @param {Number} otp - User verification otp email otp
 * @returns - promise reject or resolve
 */

const sendSignupEmailOtp = async ({ otp, email }) => {

    // @TODO - create email template with dynamic otp 
    const { html, subject } = emailTemplates.signUpVerficationOtp({ otp });

    // @TODO - Send email to user with nodemailer
    await sendSesEmail({ to: email, subject, html });

    return
};

/**
 * @description -This function sends otp email to the user with the email
 * @param {String} email - User regestered email
 * @param {Number} otp - User verification otp email otp
 * @returns - promise reject or resolve
 */

const sendReply = async ({ email, message, subject }) => {

    // @TODO - create email template with dynamic otp 
    const { html } = emailTemplates.replyEmail({ message });

    // @TODO - Send email to user with nodemailer
    await sendEmail({ to: email, subject, html });

    return
};

module.exports = {
    sendOtpEmail,
    sendSignupEmailOtp,
    sendChangePasswordEmail,
    sendReply
};