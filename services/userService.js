const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.users;

// ----------signup-----------
const signup = async (userName, email, password) => {
  try {
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey);
      console.log(token);
      return { message: "User signed up successfully...!!" };
    } else {
      return { error: "Details are not correct" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
};

// -----------login--------------
const login = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey);
        console.log(token);
        return { message: "Logged in successfully..!!" };
      } else {
        return { error: "Authentication failed" };
      }
    } else {
      return { error: "Authentication fail" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
};

module.exports = {
  signup,
  login,
};