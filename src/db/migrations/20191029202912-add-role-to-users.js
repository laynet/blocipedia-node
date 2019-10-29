"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addCollumn("Users", "role", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "member"
      });
    };
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "role");
  }
};
