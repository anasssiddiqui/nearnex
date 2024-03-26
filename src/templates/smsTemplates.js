/**
 * @description - This function is used to create the sms body for login otp
 */

const loginOtpMessage = ({ otp }) => {
  return `
  Your user verification code for Package Delivery is:
  ${otp}. Please enter this code to complete your login to Package Delivery`;
};


/**
 * @description - This function is used to create the sms body for forget password otp
 */

const forgetPasswordOtpMessage = ({ otp }) => {
  return `
    Hey! Your Package Delivery Forget Password Otp is : ${otp}
    `;
};


/**
 * @description - This function is used to create the sms body for forget password otp
 */

const sendPasswordMessage = ({ password }) => {
  return `
  Your temporary password for Package Delivery is: ${password}. Please use this
  password to access your account and establish a new password upon login.
    `;
};
module.exports = {
  loginOtpMessage,
  forgetPasswordOtpMessage,
  sendPasswordMessage
};
