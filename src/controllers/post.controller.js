const services = require("../services/mongodb.services");
const { SuccessResponse } = require("../utility/apiResponse");
const { BadRequest } = require("../utility/apiError");
const message = require("../utility/message");
const { Post } = require("../models/index");


/**
 * @description - This controller is used for create new post
 * @Method - post
 * @Route - post/create-post
 */

const createPost = async (req, res, next) => {
  try {
    let body = req.body
    body.userId = req.user.id
    let post = await new Post(body);

    await services.createForAwait(post)
    return new SuccessResponse(message.success.CreatePost).send(res);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

/**
 * @description - This controller is used for get all user posts
 * @Method - post
 * @Route - post/get-posts
 */

const getPosts = async (req, res, next) => {
  try {
    const USER = req.user

    const postsList = await services.findManyForAwait(Post, { userId: USER.id })
    return new SuccessResponse(message.success.CreatePost, { postsList }).send(res);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

module.exports = {
  createPost,
  getPosts
};
