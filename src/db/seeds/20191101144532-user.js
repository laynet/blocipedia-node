"use strict";
const faker = require("faker");
let users = [
  {
    username: "testname1",
    email: "testemail1@testmail.com",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard"
  },
  {
    username: "testname2",
    email: "testemail2@testmail.com",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard"
  },
  {
    username: "testname3",
    email: "testemail3@testmail.com",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard"
  }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
