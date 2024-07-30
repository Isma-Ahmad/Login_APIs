const express = require("express");
const db = require("../models");

const User = db.users;

const saveUser = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (username) {
      return res.status(409).send("Username already taken");
    }

    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailcheck) {
      return res.status(409).send("Email already registered");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while processing the request");
  }
};

module.exports = {
  saveUser,
};