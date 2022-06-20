const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//REGISTER
router.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(401).json("User already exists");

  //hashing password
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  //send to MongoDb
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ savedUser, status: 201 }); //send to client
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log(req.body.username);
    console.log(req.body.password);
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("Invalid username or password");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json("Invalid username or password");

    //create jsonwebtoken
    const access_token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", access_token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        ...others,
        status: 200,
        message: "Successfully Logged In",
        access_token,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGOUT
router.get("/logout", (req, res) => {
  //delete cookie
  res.cookie("access_token", "", { maxAge: 1 });
  res
    .status(200)
    .json({ status: 200, message: "You're successfully logged out" });
});

module.exports = router;
