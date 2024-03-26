require("dotenv").config();

const swaggerDefination = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "nearnex  apis",
        description: "List of nearnex Api",
    },
    servers: [
        { url: "http://localhost:6407", description: "Local server" },
    ],
    components: {
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    },
    consumes: ["application/json", "multipart/form-data"],
    produces: ["application/json"],
};

const options = {
    swaggerDefinition: swaggerDefination,
    apis: [
        "./src/routes/v1/*.routes.js",
        "./src/routes/v1/*.routes.js",
        "./src/models/*.model.js",
    ],
};

/** @description - This is the config object which will contain the environment variables */

const config = {
    baseUrl: process.env.BASE_URL || "",
    env: process.env.NODE_ENV,
    jwtForgotPasswordSecret: process.env.JWT_FORGOT_PASSWORD_SECRET,
    // JWT expiry time in minutes
    jwtExpirationInterval: process.env.JWT_EXPIRATION_INTERVAL,
    jwtSecret: process.env.JWT_SECRET,
    postgres: {
        user: process.env.DB_USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.DB_PORT
    },
    senderEmail: process.env.SENDER_EMAIL,
    senderEmailPassword: process.env.SENDER_EMAIL_PASSWORD,
    sendGridKey: process.env.SENDGRID_KEY,
    port: process.env.PORT || 2222,
    socketPort: process.env.SOCKET_PORT,
    socketUrl: process.env.SOCKET_URL,
    saltRounds: Number(process.env.SALT_ROUNDS) || 8,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    otpSecret: process.env.OTP_SECRET,
    twilioAccoutSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    stripeTestPubKey: process.env.STRIPE_TEST_PUB_KEY,
    stripeTestSecretKey: process.env.STRIPE_TEST_SECRET_KEY,
    stripeLivePubKey: process.env.STRIPE_LIVE_PUB_KEY,
    stripeLiveSecretKey: process.env.STRIPE_LIVE_SECRET_KEY,
    serverUrl: `${process.env.SERVER_URL}`,
    stripeWebhookSecret: process.env.STRIPE_WB_SECRET,
    otpDigits: 4,
    otpPeriod: 300,
    s3AccessKeyId: process.env.S3ACCESSKEYID,
    bucketName: process.env.BUCKET_NAME,
    s3AccessKey: process.env.S3SECRETKEY,
    region: process.env.REGION,
    s3BaseUrl: process.env.S3BASE_URL,
    options: options,
    swaggerDefination,

};

module.exports = config;
