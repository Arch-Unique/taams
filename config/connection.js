const Sequelize = require("sequelize");
// module.exports = new Sequelize("montanab_api", "montanab_admin", "mezeokec51", {
//   dialect: "mysql",
// });
module.exports = new Sequelize("unnattendance", "root", "", {
  dialect: "mysql",
});