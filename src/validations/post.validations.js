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
 * @description - Create post Validations This Middleware validates the body of the Request
 * @param {string} type - email type: String
 * @param {string} title - password type: String
 * @param {string} price - name_first type: Number
 * @param {string} address - name_last type: String
 * @param {string} location - country type: String
 * @param {float} latitude - isTermsAccept type: Float
 * @param {float} latitude - isAbove18 type: Float
 * @param {string} description - isTermsAccept type: String
 * @param {string} file - isAbove18 type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const createPostValidation = [
  body("type", "type is required.")
    .exists()
    .withMessage("type is required.")
    .isIn(['offer', 'need', 'tips', 'reference'])
    .withMessage('type must be offer | need | tips | reference'),
  body("title", "title is required.")
    .exists()
    .withMessage("title is required."),
  body("price", "price is required.")
    .exists()
    .withMessage("price is required."),
  body("address", "address is required.")
    .exists()
    .withMessage("address is required."),
  body("location", "location is required.")
    .exists()
    .withMessage("location is required."),
  body("latitude", "latitude is required.")
    .exists()
    .withMessage("latitude is required."),
  body("longitude", "longitude is required.")
    .exists()
    .withMessage("longitude is required."),
  body("description", "description is required.")
    .exists()
    .withMessage("description is required."),
  body("file", "file is required.")
    .exists()
    .withMessage("file is required."),
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
  createPostValidation,
};
