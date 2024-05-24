const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  hostelName: {
    type: String,

  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  relationshipStatus: {
    type: String,
    required: true
  },
  roomNumber:{
    type:String,

  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
