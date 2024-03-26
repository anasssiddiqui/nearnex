const express = require("express");
const app = express();
const loadAppRoutes = require("./src/loaders/loadAppRoutes");
const loadAppMiddlewares = require("./src/loaders/loadAppMiddleware");
const loadDatabase = require("./src/loaders/loadDatabase");
const http = require('http')
const server = http.createServer(app);
app.set('views', __dirname + '/views');
var path = require('path');

app.use("/public", express.static(path.join(__dirname, 'public')));

/** @description Iniitialise the logger middleware and assign it to global logger variable */
global.logger = require("./logger");

/*** @description - This is to handle all the unhandled rejections so as to prevent fatal crash in case of unhandled rejection */

process.on("unhandledRejection", (error) => {
    console.error("Uncaught Error", { error: error.message });
    logger.error("error", error);
});

/** @description - This function is used to intitialise all the important components of the App at  the initial run of the app like  routes points , init middlewares*/

(function () {

    /** @description App request parser Initialisation */

    loadAppMiddlewares.initRequestParserMiddlewares({ app, express });

    /** @description App routes Iniitialisation */

    loadAppRoutes.initRoutes({ app });

    /**  @description  App middlewares Initialisation*/

    loadAppMiddlewares.initMiddlewares({ app, express });

    /**  @description   Database Initialisation  */
    loadDatabase.initDatabase();
})();

module.exports = server;