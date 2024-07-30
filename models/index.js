const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("login", "postgres", "1234", {
    host: "localhost",
    dialect: "postgres",
  });

  
//   sequelize.authenticate().then(() => {
//     console.log(`Database connected to login`)
// }).catch((err) => {
//     console.log(err)
// })

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.users = require('./user') (sequelize, DataTypes)


module.exports = db