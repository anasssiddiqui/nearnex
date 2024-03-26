const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");

const routes = [
  {
    method: "use",
    url: "/auth",
    handler: authRoutes,
  },
  {
    method: "use",
    url: "/post",
    handler: postRoutes,
  },
];

router.get("/status", (req, res) => res.send("OK"));

(function () {
  routes.forEach((route) => {
    router[route.method](route.url, route.handler);
  });
})();

module.exports = router;
