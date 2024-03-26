
const express = require("express");
const router = express.Router();
const asyncHandler = require('../../helper/asyncHandler')
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { options } = require("../../utility/config");

/* @description Admin route methods   */

const specs = swaggerJsdoc(options);

/* @description - The route end Point for the api-docs */

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;