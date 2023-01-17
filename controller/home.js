const User = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports.home = async function (req, res) {
  try {
    if (req.user.type != "admin") {
      return res.status(400).json({
        success: false,
        message: "only admin can access this page",
      });
    }
    let users = await User.find({});
    return res.status(200).json({
      success: true,
      message: "list all users!",
      data: {
        users,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      message: "error!",
    });
  }
};

module.exports.register = async function (req, res) {
  try {
    console.log("register controller!");
    let user = await User.create(req.body);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "user created!",
        data: {
          user,
        },
      });
    } else {
      return res.status(400).json({
        message: "user  is not formed!",
        success: false,
      });
    }
  } catch (e) {
    console.log("error in register", e);
    return res.status(400).json({
      success: false,
      message: "error",
      data: {
        e,
      },
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user || user.password !== req.body.password) {
      return res.status(422).json({
        success: false,
        message: "user not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "sign-in successfully!",
      data: {
        token: jwt.sign(user.toJSON(), "something", { expiresIn: "1000000" }),
      },
    });
  } catch (e) {
    console.log("error in login", e);
    return res.status(404).json({
      success: false,
      message: "error",
      data: {
        e,
      },
    });
  }
};

module.exports.addMember = async function (req, res) {
  try {
    if (req.user.type != "admin") {
      return res.status(400).json({
        success: false,
        message: "only admin can add member",
      });
    }
    let currentuser = await User.findById(req.user._id);
    if (currentuser.type != "admin") {
      return res.status(422).json({
        success: false,
        message: "only admin can add member!",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      let newUser = User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: "member",
      });
      return res.status(200).json({
        success: true,
        message: "member add successfully!",
        data: {
          user: newUser,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "user with this email is exist!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      message: "error in adding memeber!",
    });
  }
};

module.exports.biling = async function (req, res) {
  try {
    if (req.user.type != "admin") {
      return res.status(400).json({
        success: false,
        message: "only admin can access this page!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "biling !",
      data: {
        biling: {
          1: { total: 56, price: 24434 },
          2: { total: 09, price: 23568 },
          3: { total: 56, price: 24434 },
          4: { total: 98, price: 433454 },
          5: { total: 59, price: 0878 },
          6: { total: 56, price: 4546757 },
        },
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      message: "error in biling!",
    });
  }
};

module.exports.removeMember = async function (req, res) {
  if (req.user.type != "admin") {
    return res.status(422).json({
      success: false,
      message: "only admin can remove member!",
    });
  }
  try {
    let user = User.findById(req.user);
    if (user.type != "admin") {
      return res.status(400).json({
        success: false,
        message: "only admin can delete member!",
      });
    }
    let newUser = User.findOneAndDelete({ email: req.query.email });
    if (newUser) {
      return res.status(200).json({
        success: true,
        message: "member deleted successfully!",
        data: {
          member: newUser,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "member is not found!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      message: "error in removing member!",
    });
  }
};

module.exports.dashboard = async function (req, res) {
  try {
    return res.status(200).json({
      success: 200,
      message: "dashboard!",
      data: {
        user: req.user,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: true,
      message: "error in dashboard!",
    });
  }
};
