module.exports = app => {
    const portfolio = require("../controllers/portfolio.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", portfolio.create);
  
    router.get("/", portfolio.findAll);
      
    router.get("/:id", portfolio.findOne);
  
    router.put("/:id", portfolio.update);
  
    router.delete("/:id", portfolio.delete);
  
    app.use("/api/portfolios", router);
  };