const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    });
    // console.log(newUser)
    res.status(200).json(newUser);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};
module.exports = register;
