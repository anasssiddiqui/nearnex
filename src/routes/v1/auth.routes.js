const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const asyncHandler = require("../../helper/asyncHandler");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const {
  signupValidation,
  loginValidation,
} = require("../../validations/auth.validations");

/** @description - Status route */

/**
 * @swagger
 * /v1/auth/status:
 *   get:
 *     tags:
 *       - User auth
 *     summary: 'User route status'
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

router.get("/status", (req, res) => res.send(" OK from user auth  route "));

/**
 * @swagger
 * /v1/auth/signUp:
 *   post:
 *     tags:
 *       - User auth
 *     summary: 'User login'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'user@yopmail.com'
 *               name_first:
 *                 type: string
 *                 example: firstName
 *               name_last:
 *                 type: string
 *                 example: firstName
 *               username:
 *                 type: string
 *                 example: jhondoe123
 *               country:
 *                 type: string
 *                 example: usa
 *               fcmToken:
 *                 type: string
 *                 example: 'static tokken'
 *               isTermsAccept:
 *                 type: boolean
 *                 example: true
 *               isAbove18:
 *                 type: boolean
 *                 example: true
 *               password:
 *                 type: string
 *                 example: 123
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

router.post("/signUp", signupValidation, asyncHandler(authController.signUp));

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - User auth
 *     summary: 'User login'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'user@yopmail.com'
 *               password:
 *                 type: string
 *                 example: '123456'
 *               fcmToken:
 *                 type: string
 *                 examples: 'static tokken'
 *               deviceType:
 *                 type: string
 *                 example: 'android'
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

router.post("/login", loginValidation, asyncHandler(authController.login));

module.exports = router;
