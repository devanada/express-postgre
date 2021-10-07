module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("Teachers", {
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
  });

  return Tutorial;
};
