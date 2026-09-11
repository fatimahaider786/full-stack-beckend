const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: 'Email already exists, please use another email'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname: firstName,
      lastname: lastName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      success: true,
      msg: 'User registered successfully!',
      token,
      user: { firstName, lastName, email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Error in registration!', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        msg: 'User don\'t exist, please create account first'
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid Credentials'
      });
    }

    const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      msg: 'User logged in successfully!',
      token,
      response_data: { email: existingUser.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Internal server error', error: error.message });
  }
};

module.exports = { register, login };