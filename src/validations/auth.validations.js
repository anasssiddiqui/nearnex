const { ValidationFailure } = require("../utility/apiError");
const {
  check,
  header,
  body,
  query,
  param,
  validationResult,
} = require("express-validator");

/**
 * @description - Login Validations This Middleware validates the body of the Request
 * @param {string} email - email type: String
 * @param {string} password - password type: String
 * @param {string} name_first - name_first type: String
 * @param {string} name_last - name_last type: String
 * @param {string} country - country type: String
 * @param {boolean} isTermsAccept - isTermsAccept type: Boolean
 * @param {boolean} isAbove18 - isAbove18 type: Boolean
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const signupValidation = [
  body("email", "email is required.")
    .exists()
    .isEmail()
    .withMessage("email is required."),
  body("password", "password is required.")
    .exists()
    .withMessage("password is required."),
  body("name_first", "name_first is required.")
    .exists()
    .withMessage("firstName is required."),
  body("name_last", "name_last is required.")
    .exists()
    .withMessage("name_last is required."),
  body("country", "country is required.")
    .exists()
    .withMessage("country is required."),
  body("isTermsAccept", "isTermsAccept is required.")
    .exists()
    .withMessage("isTermsAccept is required."),
  body("isAbove18", "isTermsAccept is required.")
    .exists()
    .withMessage("isAbove18 is required."),
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        logger.error("error in validation ", {
          error: errors.array(),
        });
        throw new ValidationFailure(`Validation Error`, errors.array());
      }
      next();
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
];

/**
 * @description - Login Validations This Middleware validates the body of the Request
 * @param {string} email - email type: String
 * @param {string} password - password type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const loginValidation = [
  body("email", "email is required.")
    .exists()
    .isEmail()
    .withMessage("email is required."),
  body("password", "password is required.")
    .exists()
    .withMessage("password is required."),
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        logger.error("error in validation ", {
          error: errors.array(),
        });
        throw new ValidationFailure(`Validation Error`, errors.array());
      }
      next();
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
];


module.exports = {
  signupValidation,
  loginValidation,
};
