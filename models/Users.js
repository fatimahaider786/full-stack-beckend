const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please fill first name!'],
    minlength: [3, 'First name should least beat of 3 characters'],
    maxlength: [50, 'First name should not exceed 50 characters']
  },
  lastname: {
    type: String,
    required: [true, 'Please fill last name!'],
    minlength: [3, 'Last name should least beat of 3 characters'],
    maxlength: [50, 'Last name should not exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please fill Email!'],
    maxlength: [50, 'Email should not exceed 50 characters'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please fill Password!'],
    minlength: [8, 'Password should be at least of 8 characters']
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;