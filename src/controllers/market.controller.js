const db = require("../models");
const Market = db.market;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Market.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving markets."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Market.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "market was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update market with id=${id}. Maybe market was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating market with id=" + id
      });
    });
};


