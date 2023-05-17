const db = require("../models");
const Stock = db.stock;
const User = db.user;
const Market = db.market;
const Order = db.order;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.fullname || 
      !req.body.symbol   || 
      !req.body.price    ||
      !req.body.fullname ||
      !req.body.share    ||
      !req.body.portfolioId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const stock = {
    fullname: req.body.fullname,
    symbol: req.body.symbol,
    price: req.body.price,
    share: req.body.share,
    portfolioId: req.body.portfolioId
  };

  Stock.create(stock)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stock."
      });
    });
};

exports.register = (req, res) => {
  const id = req.params.id;
  Stock.update({isRegistered: true}, {
    where: { id: id }
  }).then(data => {
      res.send("Stock registered");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the stock."
      });
    });
};


exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Stock.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stocks."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Stock.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving stock with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Stock.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "stock was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update stock with id=${id}. Maybe stock was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating stock with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Stock.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "stock was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete stock with id=${id}. Maybe stock was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete stock with id=" + id
      });
    });
};

exports.buy = async (req, res) => {
  const symbol = req.body.symbol;
  const count = req.body.count;
  const email = req.body.email;
  var whoSell = await User.findOne({where: {email: email}});
  if(whoSell.isRegistered === false) {
    res.status(500).send({message: "User who is not registered can't buy or sell stock."});
  }
  var boughtStock = await Market.findOne({ where: { symbol: symbol }
}).then(function (boughtStock) {
  if(boughtStock.isRegistered === false) {
    res.status(500).send({message: "Stock that is not registered can't be bought or sold."});
  }
  let balance = parseFloat(whoSell.balance).toFixed(2);
  let price = (count * parseFloat(boughtStock.price).toFixed(2));
  if (boughtStock.share > count && balance > price) {
    let newShare = parseInt(boughtStock.share) - parseInt(count);
    Market.update({ share : newShare }, { where: { symbol: boughtStock.symbol }});
    balance = (balance - price);
    whoSell.balance = balance;
    console.log("User " + whoSell.fullname + " bought total of " + count + " " + boughtStock.fullname + "(" + boughtStock.symbol + ")" + " shares");
    User.update({ balance : balance }, { where: { email: whoSell.email } }).then(
      res.send({ message: "balance was updated successfully." }))
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Couldn't buy the stock"
    });
  });
};

exports.sell = async (req, res) => {
  const symbol = req.body.symbol;
  const count = req.body.count;
  const email = req.body.email;
  const portfolio = req.body.portfolio;
  let whoSell = await User.findOne({ where: {email: email}});
  if(whoSell.isRegistered === false) {
    res.status(500).send({message: "User who is not registered can't buy or sell stock."});
  }
  soldStock = await Stock.findOne({ where: { symbol: symbol, portfolioId: portfolio }
  }).then(function (soldStock) { 
    if(soldStock.isRegistered === false) {
      res.status(500).send({message: "Stock that is not registered can't be bought or sold."});
    }
    if(soldStock.share > count) {
      let newShare = parseInt(soldStock.share) - parseInt(count);
      Stock.update({ share : newShare }, { where: { symbol: soldStock.symbol, portfolioId: portfolio }});
      let newBalance = parseFloat(whoSell.balance).toFixed(2);
      let stockPrice = parseFloat(soldStock.price).toFixed(2) * count;
      newBalance = (parseFloat(newBalance) + parseFloat(stockPrice));
      console.log("User " + whoSell.fullname + " sold total of " + count + " " + soldStock.fullname + "(" + soldStock.symbol + ")" + " shares");
      User.update({ balance : newBalance }, { where: { email: whoSell.email }}).then(
          res.send({ message: "stock was updated successfully." })
      )
    }})
    .catch(err => {
      res.status(500).send({
      message: "Couldn't sell the stock"
    });
  });
};