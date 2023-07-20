const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    // console.log(process.env.JWT_SECRET)

    if (userDoc) {
      userDoc.password = undefined;

      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET);
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      res.cookie("token", token, cookieOptions);

      res.status(200).json(userDoc);
    } else {
      res.status(422).json("User not found");
    }
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};
module.exports = login;
