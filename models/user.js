const mongoose = require("mongoose");
const validator = require("validator");
const JWT = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email"],
    },
    salt: String,

    encry_password: {
      type: String,
      required: [true, "Please enter password"],
      trim: true,
    },
  },
  {timestamps: true}
);

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

//campare password
UserSchema.methods = {
  camparePassword: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  //generate token
  getJWToken: function () {
    return JWT.sign({id: this._id}, process.env.SECRET);
  },
};

module.exports = mongoose.model("user", UserSchema);
