"use strict";
module.exports = (sequelize, DataTypes) => {
  var Collaborators = sequelize.define(
    "Collaborators",
    {
      wikiId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Collaborators.associate = function(models) {
    // associations can be defined here
    Collaborators.belongsTo(models.Wiki, {
      foreignKey: "wikiId",
      as: "wiki",
      onDelete: "CASCADE"
    });
    Collaborators.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE"
    });
    Collaborators.addScope("collaboratorsFor", wikiId => {
      return {
        include: [
          {
            model: models.User
          }
        ],
        where: { wikiId: wikiId },
        order: [["createdAt", "ASC"]]
      };
    });
    Collaborators.addScope("collaboratorFor", userId => {
      return {
        include: [
          {
            model: models.Wiki
          }
        ],
        where: { userId: userId },
        order: [["createdAt", "ASC"]]
      };
    });
  };
  return Collaborators;
};
