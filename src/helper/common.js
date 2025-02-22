const { totp } = require("otplib");
const { otpSecret } = require("../utility/config");
const secret = otpSecret || "";
const { ObjectId } = require("mongoose").Types;
const { otpDigits, otpPeriod, s3BaseUrl } = require("../utility/config");
const randomstring = require("randomstring");
const domains = require("disposable-email-domains");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpirationInterval } = require("../utility/config");
const { Unauthorized } = require("../utility/apiError");
const bcrypt = require("bcryptjs");

/**
 * @description - This Function is used to generate the token
 */

const generateJWTToken = async ({
  payload = {},
  secret = "",
  expiresIn = "1h",
}) => {
  const token = await jwt.sign(payload, secret, { expiresIn });
  return token;
};

/**
 * @description - This Function is used to verify the token
 * @returns {boolean} - Return number random
 */

const generateOtpNumber = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

/**
 * @description - This function is used to Generate an otp code/token
 * @param {number} period  - Expiry Time in Seconds
 * @param {number} digits  - Number of character/digits in otp
 * @param {string} userId  - _id of the user record
 * @returns {string} - Return an otp
 */

const generateToken = (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: jwtExpirationInterval });
};

/**
 * @description - This Function is used to verify the token
 * @param {string} token  - Otp or token generated by generateToken method
 * @param {string} userId  - _id of the user record which is used as secret in GenerateToken function
 * @returns {boolean} - Return boolean if token is verified or not
 */

const verifyToken = ({ token, userId = "" }) => {
  return totp.verify({ token, secret: secret + String(userId) });
};

/**
 * @param {number} time  - The date object/time
 * @param {number} minutes  -The minute in number
 * @returns {Date} - This returns the time after adding minutes to it
 */

const AddMinutesToDate = ({ time, minutes }) => {
  return new Date(time.getTime() + minutes * 60000);
};

/**
 * @description - This function is to check if id provided is valid mongoid or not
 * @param {string} id -  the id to check if it is valid mongoid or not
 * @returns {boolean} - returns the boolean whether the value is valid mongoId or not
 */

const isValidMongoId = (id) => {
  return ObjectId.isValid(id); //true
};

/**
 * @description - This function is used to find out difference between to date time object in minutes
 * @param {Date} dt1 -This is the date time object of end time
 * @param {Date} dt2 - This is the date time object of start time
 * @returns {number} - This returns the number of minutes difference
 */

const minutesDifference = (dt1, dt2) => {
  let diff = (dt1.getTime() - dt2.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.ceil(diff));
};

/**
 * @description - This function is used to return a date with end of the day time
 * @param {Date} date -This is the date time
 * @returns {Date} - This returns the date time object
 */

const getEodDate = (date) => {
  let actualDate = new Date(date);
  return new Date(
    actualDate.getFullYear(),
    actualDate.getMonth(),
    actualDate.getDate(),
    23,
    59,
    59
  );
};

/**
 * @description -
 * @param {string} email
 * @returns
 */

const isDisposableEmail = (email) => {
  let arr = email.split("@");
  let domain = arr[arr.length - 1];
  return domains.includes(domain);
};

/**
 * @description - This function is used to Generate an otp code/token
 * @param {number} period  - Expiry Time in Seconds
 * @param {number} digits  - Number of character/digits in otp
 * @param {string} userId  - _id of the user record
 * @returns {string} - Return an otp
 */

const generateOtpData = ({ userId = "" }) => {
  let time = new Date();
  const otp = generateToken({ period: otpPeriod, digits: otpDigits, userId });
  const otpExpiryTime = AddMinutesToDate({ time, minutes: 5 });
  return { otp, expiryTime: otpExpiryTime };
};

/**
 * @description - This function is used for generating the email verification token
 * @param {*} length
 * @returns
 */

const generateVerificationToken = (length = 12) => {
  return randomString.generate(length);
};

const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

/**
 *
 * @param {*} fields
 * @param {*} body
 * @returns
 */
const getDtoObject = (fields, body) => {
  let returnObj = {};
  fields.forEach((key) => {
    if (body[key]) {
      returnObj[key] = body[key];
    }
  });
  return returnObj;
};

/**
 *
 * @param {*} token
 * @returns
 */
const decodeToken = (token) => {
  let decoded = jwt.verify(token, jwtSecret);
  if (!decoded) {
    throw new Unauthorized("Invalid Token");
  }
  return decoded;
};

/**
 *
 * @param {*} fileName
 * @returns
 */
const getBucketFileUrl = (fileName = "default.jpg") => {
  // make sure s3baseUrl has "/" at the end example : https://bucketname.s3.region.amazonaws.com/
  return s3BaseUrl + fileName;
};

/**
 * this function take date in dd-MM-yyyy format and return the general format
 * @param {*} date
 * @returns
 */
const changeDateFomate = (date) => {
  const newDateArr = date.split("-");
  console.log("newDateArr", newDateArr);
  const newDateInYearFormat = new Date(
    parseInt(newDateArr[2]),
    parseInt(newDateArr[1]) - 1,
    parseInt(newDateArr[0])
  );
  var newDateIso = newDateInYearFormat.toISOString();
  return newDateIso;
};

/**
 * this function take date in dd-MM-yyyy format and return the general format
 * @param {*} date
 * @returns
 */
const changeDateFormateDiff = (date) => {
  const newDateArr = date.split("-");
  console.log("newDateArr", newDateArr);
  const newDateInYearFormat = new Date(
    parseInt(newDateArr[0]),
    parseInt(newDateArr[1]) - 1,
    parseInt(newDateArr[2])
  );
  var newDateIso = newDateInYearFormat.toISOString();
  return newDateIso;
};

/**
 * this function take date and time in dd-MM-yyyy and hh-mm format and return the general format
 * @param {*} date
 * @param {*} time
 * @returns
 */
const changeTimeFomate = (date, time) => {
  const newDateArr = date.split("-");
  const newTimeArr = time.split("-");
  const newDateInYearFormat = new Date(
    parseInt(newDateArr[2]),
    parseInt(newDateArr[1]) - 1,
    parseInt(newDateArr[0]),
    parseInt(newTimeArr[0]),
    parseInt(newTimeArr[1])
  );
  var newTime = newDateInYearFormat.toISOString();
  return newTime;
};

/**
 * @param {*} ts
 * @returns
 */

const getDateFromTimeStamp = (ts) => {
  return new Date(ts * 1000);
};

const generateRandomNumber = (size) => {
  return randomstring.generate({ length: size, charset: "numeric" });
};

const comparePassword = async (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  AddMinutesToDate,
  isValidMongoId,
  minutesDifference,
  getEodDate,
  changeDateFomate,
  isDisposableEmail,
  generateOtpData,
  generateVerificationToken,
  validateEmail,
  getDtoObject,
  decodeToken,
  getBucketFileUrl,
  getDateFromTimeStamp,
  changeTimeFomate,
  generateRandomNumber,
  comparePassword,
  generateOtpNumber,
  generateJWTToken,
  changeDateFormateDiff,
};
