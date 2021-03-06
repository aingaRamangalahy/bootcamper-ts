import * as mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter valid email'
      ]
    },
    role: {
      type: String,
      enum: ['user', 'publisher'],
      default: 'user'
    },
    password: {
      type: String,
      required: [true, 'please add password'],
      minlength: 6,
      select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAd: {
      type: Date,
      default: Date.now
    }
  });

  export default mongoose.model("User", UserSchema);