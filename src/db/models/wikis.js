'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wikis = sequelize.define('Wikis', {
    title: DataTypes.STRING
  }, {});
  Wikis.associate = function(models) {
    // associations can be defined here
  };
  return Wikis;
};