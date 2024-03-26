const Users = require("../models/user.model");
const { ObjectId } = require("mongoose").Types;
const { BadRequest } = require("../utility/apiError");

const message = require("./../utility/message")
const getUserById = async (decode) => {
  let user = await Users.findOne(
    {
      _id: decode._id,
      email: decode.email,
    },
  );


  if (!user) {
    throw new Error("No user found");
  }

  if (user.status == 'SUSPENDED') throw new BadRequest(message.error.accountSuspended);

  return user;
};

const injectUserDetails = async (req, res, next) => {
  try {
    let user = await getUserById(req.decoded);
    req.user = user;
    next();
  } catch (error) {
    logger.error(error);
    return res.status(400).send({
      status: "BadRequest",
      statusCode: 400,
      message: error.message,
    });
  }
};

module.exports = {
  injectUserDetails,
};
