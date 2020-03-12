const router = require("express").Router();
const controller = require("./controllers/controllers.js");

router.get("/budget", controller.budget.get);

router.get("/log", controller.log.get);

router.get("/log/expenses", controller.log.getTotal);

router.post("/budget", controller.budget.post);

router.post("/log", controller.log.post);

router.delete("/budget", controller.budget.delete);

router.delete("/log", controller.log.delete);

module.exports = router;
