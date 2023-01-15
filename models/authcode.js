const sequelize = require("../config/connection");
const { DataTypes } = require("sequelize");

const Authcode = sequelize.define("Authcode", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  is_used: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  associated_regno: {
    type: DataTypes.STRING(12),
    allowNull: true,
  },
});

module.exports = Authcode;
