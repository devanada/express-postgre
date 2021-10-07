const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.first_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const body = {
    first_name: req.body.first_name,
    last_name: req.body.last_name ? req.body.last_name : null,
    email: req.body.email ? req.body.email : null,
    gender: req.body.gender ? req.body.gender : null,
  };

  Tutorial.create(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Teacher.",
      });
    });
};

exports.findAll = (req, res) => {
  const first_name = req.query.first_name;
  var condition = first_name
    ? { first_name: { [Op.iLike]: `%${first_name}` } }
    : null;

  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving teachers.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Teacher with id= ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Teacher with id= ${id}.`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Teacher was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Teacher with id= ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updateing Teacher with id= ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Teacher was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Teacher with id= ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Teacher with id= ${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Teachers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all teachers",
      });
    });
};
