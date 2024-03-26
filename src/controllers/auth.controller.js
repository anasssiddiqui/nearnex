const services = require("../services/mongodb.services");
const utils = require("../utils/auth.utilities");
const { SuccessResponse } = require("../utility/apiResponse");
const { BadRequest } = require("../utility/apiError");
const message = require("../utility/message");
const User = require("../models/user.model");
const { generateJWTToken } = require("../../src/helper/common");
const emailServices = require("../services/email.services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  comparePassword,
  generateToken,
} = require("../helper/common");

/**
 * @description - This controller is used for create new account
 * @Method - post
 * @Route - auth/signUp
 */

const signUp = async (req, res, next) => {
  try {
    //@TODO- check email duplicacy
    await utils.checkEmailAvalibility(req.body.email);

    //@TODO- check username duplicacy
    await utils.checkUsernameAvalibility(req.body.username);

    var user = await new User(req.body);
    const token = await generateToken(user.toJSON()); // authorization token
    user.token = token;
    await services.createForAwait(user);

    return new SuccessResponse(message.success.signup, { user, token: token }).send(res);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

/**
 * @description - This controller is used for login in account
 * @Method - post
 * @Route - auth/login
 */

const login = async (req, res, next) => {
  try {
    const { email, password, fcmToken } = req.body;

    let user = await services.findOneForAwait(User, { email, email }, {});
    if (!user) throw new BadRequest(message.error.inavalidEmail);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new BadRequest(message.error.invalidPassword);

    // authorization token
    const token = await generateToken({ _id: user._id, role: "user", email: user.email });

    await services.findOneAndUpdateForAwait(User, { _id: user._id }, { token: token, fcmToken: fcmToken, });

    return new SuccessResponse(message.success.login, { user, token: token, }).send(res);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};


module.exports = {
  signUp,
  login,
};
