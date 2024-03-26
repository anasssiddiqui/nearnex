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
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const changeTimeFormatValidation = [
  body("timeFormat", "timeFormat is required.")
    .exists().withMessage("timeFormat is required.").isIn([12, 24]).withMessage('status must be 12 | 24 '),
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
  changeTimeFormatValidation
};
