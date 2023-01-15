const crypto = require("crypto");
const express = require("express");
const Authcode = require("../models/authcode");
const router = express.Router();
const { Op } = require("sequelize");

function getNoOfCodes(no) {
  let codes = [];
  for (let index = 0; index < no; index++) {
    let randomBuffer = crypto.randomBytes(16);
    let uniqueNumber = randomBuffer.toString("hex");
    uniqueNumber = uniqueNumber.slice(0, 16);
    codes[index] = uniqueNumber;
  }
  console.log(codes);
  return codes;
}

//generate authcodes
router.get("/generate/:number", (req, res) => {
  const no = parseInt(req.params.number);

  if (no > 1001) {
    res.send("Above maximum allowed number , Max = 1000");
    return;
  }

  if (no < 10) {
    res.send("Below minimum allowed number , Min = 10");
    return;
  }

  const codes = getNoOfCodes(no);

  let codesDB = [];
  for (let index = 0; index < codes.length; index++) {
    // const element = codes[index];
    const element = index;
    codesDB.push({
      token: element,
      is_used: false,
    });
  }

  Authcode.bulkCreate(codesDB)
    .then((res) =>
      res.status(200).json({ status: "success", msg: "Inserted successfully" })
    )
    .catch((err) => res.json({ status: "error", msg: err }));
});

//check authcodes
router.post("/check/:code", async (req, res) => {
  const code = req.params.code;
  const regno = req.body.regno;

  try {
    if (code == "") {
      throw "Invalid Code";
    }

    const oldToken = await Authcode.findOne({ where: { token: code } });
    if (oldToken) {
      // if (oldToken.is_used) {
      //   throw "Used code";
      // }
      if (oldToken.associated_regno) {
        if (oldToken.associated_regno != regno) {
          throw "Used code";
        }
      } else {
        oldToken.associated_regno = regno;
        oldToken.is_used = true;
        console.log("here1");
        oldToken.save();
      }

      res.status(200).json({
        status: "success",
        msg: "Correct code",
      });
    } else {
      throw "Invalid Code";
    }
  } catch (error) {
    console.log("here3");
    console.log(error);
    res.status(404).json({
      status: "error",
      msg: error,
    });
  }
});

module.exports = router;
