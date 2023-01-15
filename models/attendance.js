const sequelize = require("../config/connection");
const { DataTypes } = require("sequelize");

const Attendance = sequelize.define(
  "Attendance",
  {
    regno: {
      type: DataTypes.STRING(12),
      allowNull: false,
      validate: {
        len: [11, 12],
      },
    },
    coursecode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        len: [6, 10],
      },
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
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    testno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "attendances",
    hooks: {
      beforeCreate: (record, options) => {
        record.dataValues.createdAt = Date.now();
        record.dataValues.updatedAt = Date.now();
      },
      beforeUpdate: (record, options) => {
        record.dataValues.updatedAt = Date.now();
      },
    },
  }
);

module.exports = Attendance;
