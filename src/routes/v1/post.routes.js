const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");
const asyncHandler = require("../../helper/asyncHandler");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { injectUserDetails } = require("../../middlewares/injectUserDetails.middleware");

const {
  createPostValidation
} = require("../../validations/post.validations");

/** @description - Status route */

/**
 * @swagger
 * /v1/auth/status:
 *   get:
 *     tags:
 *       - Post 
 *     summary: 'Post route status'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */

router.get("/status", (req, res) => res.send("OK from post route"));

/**
 * @swagger
 * /v1/post/create-post:
 *   post:
 *     tags:
 *       - Post
 *     summary: 'Create new post'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: 'offer,need,tips,reference'
 *               title:
 *                 type: string
 *                 example: firstName
 *               price:
 *                 type: number
 *                 example: 60
 *               address:
 *                 type: string
 *                 example: 'street 890'
 *               location:
 *                 type: string
 *                 example: 'street 890'
 *               latitude:
 *                 type: float
 *                 example: 97.981
 *               longitude:
 *                 type: float
 *                 example: 97.982
 *               description:
 *                 type: string
 *                 example: "All about post"
 *               file:
 *                 type: string
 *                 example: 'file path'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */

router.post("/create-post", authMiddleware, injectUserDetails, createPostValidation, asyncHandler(postController.createPost));

/**
 * @swagger
 * /v1/post/get-posts:
 *   get:
 *     tags:
 *       - Post
 *     summary: 'Get all posts list'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */

router.get(
  "/get-posts",
  authMiddleware,
  injectUserDetails,
  asyncHandler(postController.getPosts)
);

module.exports = router;
