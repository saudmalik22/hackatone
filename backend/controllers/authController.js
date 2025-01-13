const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password: hashedPassword, email });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
    console.log('token:', token);
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      status: "error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({
        data: [],
        status: "error",
        error: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        data: [],
        status: "error",
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign({ userId: userFound._id }, process.env.SECRET_KEY);
    res.status(200).json({
      token,
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        name: userFound.name,
        address: userFound.address,
      },
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      status: "error",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};