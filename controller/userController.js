const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");


const User = db.users;

// ----------signup-----------

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey);

      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);

      return res.status(201).send({ message:"User signed up successfully...!!"});
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};


// -----------login--------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey);

        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);

        return res.status(201).send({ message:"Logged in successfully..!!"});
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication fail");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  signup,
  login,
};