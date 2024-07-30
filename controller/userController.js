const authService = require("../services/userService");

const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  const result = await authService.signup(userName, email, password);

  if (result.message) {
    return res.status(201).send(result);
  } else {
    return res.status(409).send(result.error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  if (result.message) {
    return res.status(201).send(result);
  } else {
    return res.status(401).send(result.error);
  }
};

module.exports = {
  signup,
  login,
};