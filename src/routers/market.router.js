module.exports = app => {
    const market = require("../controllers/market.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", market.findAll);
      
    router.put("/:id", market.update);
  
    app.use("/api/markets", router);
  };