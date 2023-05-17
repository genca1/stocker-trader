module.exports = app => {
    const stock = require("../controllers/stock.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", stock.create);

    router.get("/", stock.findAll);
      
    router.get("/:id", stock.findOne);
  
    router.put("/:id", stock.update);
  
    router.delete("/:id", stock.delete);

    router.post("/buy", stock.buy);

    router.post("/sell", stock.sell);

    router.post("/:id", stock.register);
    
    app.use("/api/stocks", router);
  };