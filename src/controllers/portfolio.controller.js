const db = require("../models");
const Portfolio = db.portfolio;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.fullname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const portfolio = {
    fullname: req.body.fullname,
    ownerId: req.body.ownerId
  };

  Portfolio.create(portfolio)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the portfolio."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Portfolio.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving portfolios."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Portfolio.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving portfolio with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Portfolio.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "portfolio was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update portfolio with id=${id}. Maybe portfolio was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating portfolio with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Portfolio.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "portfolio was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete portfolio with id=${id}. Maybe portfolio was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete portfolio with id=" + id
      });
    });
};

