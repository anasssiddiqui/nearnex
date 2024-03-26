const { User } = require("../models/index");
const services = require("../services/mongodb.services");
const message = require("../utility/message");

const { BadRequest } = require("../utility/apiError");

/**
 * This Functions is used for check email and password avalibilty
 */

const checkEmailAvalibility = async (email) => {

  const findEmail = await services.findOneForAwait(User, { email: email, }, {});
  if (findEmail) throw new BadRequest(message.error.emailAlreadyExist);

  return;
};

/**
 * This Functions is used for check email and password avalibilty
 */

const checkUsernameAvalibility = async (username) => {

  const findusername = await services.findOneForAwait(User, { username: username, }, {});
  if (findusername) throw new BadRequest(message.error.usernameAlreadyExist);

  return;
};



module.exports = {
  checkEmailAvalibility,
  checkUsernameAvalibility
};
