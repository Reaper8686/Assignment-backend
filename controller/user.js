const User = require("../models/user");

exports.registerUser = (req, res) => {
  const user = new User(req.body);
  user.save(
    (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      res.json({
        success: true,
        user,
      });
    },
    {ValidateBeforeSave: true}
  );
};

exports.loginUser = (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "fill fields properly",
    });
  }

  User.findOne({email}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        success: false,
        message: "User Email not found",
      });
    }
    if (!user.camparePassword(password)) {
      return res.status(401).json({
        success: false,
        message: "email and password dont match",
      });
    }

    const token = user.getJWToken();
    const {_id, name, email} = user;
    res.status(200).json({
      success: true,
      user: {_id, name, email},
      token,
    });
  });
};
