const sequelize = require("../config/connection");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  user_token: {
    type: [String],
  },
  regno: {
    type: DataTypes.STRING(12),
    allowNull: true,
    unique: true,
    validate: {
      len: [11, 12],
    },
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: String,
    unique: true,
    allowNull: true,
    lowercase: true,
    validate: {
      validator: function (text) {
        if (!text.endsWith("unn.edu.ng")) return false;
        return validator.isEmail(text);
      },
      message: "Invalid Email",
    },
  },
});

module.exports = User;
