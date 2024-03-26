/**
 * @description - This function is used to create the email subject and email html for forget password otp
 */

const forgetPasswordOtpMessage = ({ otp }) => {
    const subject = "Your One-time password";
    const html = `Hey!<br/>
    Your SnoozeCare One-time password is: ${otp}`;
    return { html, subject };
};

/**
 * @description - This function is used to create the email subject and email html for forget password otp
 */

const acceptProfileMessage = ({ }) => {
    const subject = "profile confirmation Email";
    const html = `
    Hey! your profile is sucessfully accepted by the admin
`;
    return { html, subject };
};

/** 
 * @description - This function is used to create the email subject and email html for forget password otp
 */

const rejectProfileMessage = ({ }) => {
    const subject = "profile rejection Email";
    const html = `
    Hey! your profile is rejected by the admin
`;
    return { html, subject };
};

/**
 * @description - This function is used to create the email subject and email html for send password to email
 */

const sendPasswordToEmail = ({ password }) => {
    const subject = "Password";
    const html = `
    Hey! You can use : ${password} as temporary password for Package Delivery login. Please do not share this password with others.
    After login please change this password.
    `;
    return { html, subject };
};

const replyEmail = ({ message }) => {
    const subject = "Reply from snooze care";
    const html = `
    ${message}
    `;
    return { html, subject };
};

module.exports = {
    forgetPasswordOtpMessage,
    sendPasswordToEmail,
    acceptProfileMessage,
    rejectProfileMessage,
    replyEmail
};