const mongoose = require('mongoose');

const userSchema = mongoose.Schema({});

const User = mongoose.model('User', userSchema);

export default User;
