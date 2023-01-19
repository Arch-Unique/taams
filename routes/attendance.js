const express = require("express");
const Attendance = require("../models/attendance");
const router = express.Router();
const { Op } = require("sequelize");
const sequelize = require("../config/connection");

//create attendance entry
router.post("/create", (req, res) => {
  const att = req.body;
  const fullname = att.surname + " " + att.firstname;
  console.log(att);

  Attendance.findOrCreate({
    where: {
      regno: att.regno,
      coursecode: att.coursecode,
      faculty: att.faculty,
      fullname: fullname,
      department: att.department,
      level: att.level,
      createdAt: {
        [Op.gt]: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
      },
    },
    defaults: {
      regno: att.regno,
      coursecode: att.coursecode,
      faculty: att.faculty,
      fullname: fullname,
      department: att.department,
      level: att.level,
      testno: att.no,
    },
  })
    .then((result) => {
      res.status(200).json({ status: "success", msg: "Inserted successfully" });
    })
    .catch((err) => {
      res.status(404).json({ status: "error", msg: err });
      console.log(err);
    });

  // Attendance.create({
  //   regno: att.regno,
  //   coursecode: att.coursecode,
  //   faculty: att.faculty,
  //   fullname: fullname,
  //   department: att.department,
  //   level: att.level,
  //   testno: att.no,
  // })
});

//drop attendance entry
router.get("/dropdb", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.status(200).json({ status: "success", msg: "DB Dropped" });
  } catch (error) {
    res.status(404).json({ status: "error", msg: err });
    console.log(err);
  }
});

//query attendance entry
router.post("/query", (req, res) => {
  const query = req.body.input;
  const queryType = req.body.inputtype;
  const from = parseInt(req.body.from);
  const to = parseInt(req.body.to);

  console.log(query);

  const nullAns = {
    [Op.ne]: null,
  };

  Attendance.findAll({
    where: {
      regno:
        queryType == []
          ? nullAns
          : queryType.includes("regno")
          ? query[0]
          : nullAns,
      coursecode:
        queryType == []
          ? nullAns
          : queryType.includes("course")
          ? query[0]
          : nullAns,
      faculty:
        queryType == []
          ? nullAns
          : queryType.includes("faculty")
          ? query[0]
          : nullAns,
      level:
        queryType == []
          ? nullAns
          : queryType.includes("level")
          ? query[2]
          : nullAns,
      department:
        queryType == []
          ? nullAns
          : queryType.includes("department")
          ? query[1]
          : nullAns,
      fullname:
        queryType == []
          ? nullAns
          : queryType.includes("fullname")
          ? query[0]
          : nullAns,
      createdAt: {
        [Op.between]: [from, to],
      },
    },
  })
    .then((atts) => {
      res.status(200).json({
        status: "success",
        data: atts,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ status: "error", msg: err });
    });
});

//query attendance entry by map
router.post("/query-map", (req, res) => {
  const query = req.body.input;
  const from = parseInt(req.body.from);
  const to = parseInt(req.body.to);

  console.log(query);

  const nullAns = {
    [Op.ne]: null,
  };

  Attendance.findAll({
    where: {
      regno: query.hasOwnProperty("regno") ? query.regno : nullAns,
      coursecode: query.hasOwnProperty("course") ? query.course : nullAns,
      faculty: query.hasOwnProperty("faculty") ? query.faculty : nullAns,
      level: query.hasOwnProperty("level") ? query.level : nullAns,
      department: query.hasOwnProperty("department")
        ? query.department
        : nullAns,
      fullname: query.hasOwnProperty("fullname") ? query.fullname : nullAns,
      createdAt: {
        [Op.between]: [from, to],
      },
    },
  })
    .then((atts) => {
      res.status(200).json({
        status: "success",
        data: atts,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ status: "error", msg: err });
    });
});

module.exports = router;
