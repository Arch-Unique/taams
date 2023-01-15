const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/authcode");

//create user
router.post("/register-lecturers", async (req, res) => {
  try {
    // Get user input
    const { email } = req.body;

    // Validate user input
    if (!email) {
      throw "All input is required";
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw "User Already Exist. Please Login";
    }

    // Create user in our database
    const user = await User.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
    });

    // Create token
    const token = jwt.sign(
      { id: user._id, email: email },
      process.env.TOKEN_KEY
    );
    console.log(token);
    // save user token
    user.user_token = token;
    user.save();

    const nuser = await User.findById(user._id);

    // return new user
    res.status(200).json({
      status: "success",
      msg: "User successfully created",
      data: nuser,
    });
  } catch (err) {
    res.status(404).json({ status: "error", msg: err });
  }
});

//log user in
router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      throw "All input is required";
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email }, "+password");

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { id: user._id, email: email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30d",
        }
      );

      // save user token
      user.user_token = token;
      user.save();

      const nuser = await User.findOne({ email });
      // user
      res.status(200).json({
        status: "success",
        msg: "User successfully loggedin",
        data: nuser,
      });
    } else {
      throw "Invalid Credentials";
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "error", msg: err });
  }
  // Our register logic ends here
});

//get user
router.get("/:id", (req, res) => {
  const id = req.params.id || req.user;

  User.findById(id)
    // .populate({
    //   path: "shops",
    //   populate: {
    //     path: "dispatch_rider",
    //   },
    // })
    // .exec()
    .then((result) => res.status(200).json({ status: "success", msg: result }))
    .catch((err) => res.status(404).json({ status: "error", msg: err }));
});

//update user
router.patch("/:id", (req, res) => {
  const id = req.params.id || req.user;
  User.findByIdAndUpdate(id, req.body)
    .then((result) =>
      res.status(200).json({
        status: "success",
        msg: "User successfully updated",
        data: result,
      })
    )
    .catch((err) => res.status(404).json({ status: "error", msg: err }));
});

//delete user
router.delete("/:id", (req, res) => {
  const id = req.params.id || req.user;
  User.findByIdAndDelete(id)
    .then((result) =>
      res
        .status(200)
        .json({ status: "success", msg: "User successfully deleted" })
    )
    .catch((err) => res.status(404).json({ status: "error", msg: err }));
});

///Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    // Get user input
    const { email } = req.body;

    // Validate user input
    if (!email) {
      throw "Email is required";
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      throw "User not exist";
    }

    const token = jwt.sign(
      { id: oldUser._id, email: email },
      process.env.FORGOT_PASSWORD,
      {
        expiresIn: "15m",
      }
    );

    //create link
    let newUrl = `http://localhost:3000/forgot-password/${oldUser._id}/${token}`;
    console.log(newUrl);

    // return new user
    res.status(200).json({
      status: "success",
      msg: "Password link",
      data: newUrl,
    });
  } catch (err) {
    res.status(404).json({ status: "error", msg: err });
  }
});

///Reset password
router.post("/reset-password/:token", async (req, res) => {
  try {
    // Get user input
    const { password, password2 } = req.body;

    // Validate user input
    if (!password) {
      throw "Password is required";
    }

    if (password.toLowerCase() != password2.toLowerCase()) {
      throw "Password do not match";
    }

    const decoded = jwt.verify(req.params.token, process.env.FORGOT_PASSWORD);

    let id = decoded.id;
    console.log(id);

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findById(id, "+password");
    if (!oldUser) {
      throw "User not exist";
    }

    oldUser.password = password;
    oldUser.save();

    // return new user
    res.status(200).json({
      status: "success",
      msg: "Password Reset",
      data: "Password changed successfuly",
    });
  } catch (err) {
    res.status(404).json({ status: "error", msg: err });
  }
});

module.exports = router;
