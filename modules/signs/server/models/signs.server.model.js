"use strict";

module.exports = function(sequelize, DataTypes) {

  var Sign = sequelize.define('sign', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 250],
          msg: "Sign title must be between 1 and 250 characters in length"
        },
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 250],
          msg: "Sign location must be between 1 and 250 characters in length"
        },
      }
    },
    description: DataTypes.TEXT
  }, {
    associate: function(models) {
      Sign.belongsTo(models.user);
    }
  });
  return Sign;
};
