module.exports = {
    HOST: "siud.cb93e6tdxenj.us-east-1.rds.amazonaws.com",
    USER: "siud",
    PASSWORD: "Maoz6068804!",
    DB: "siud",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

//   const db = mysql.createConnection({
//     host: "siud.cb93e6tdxenj.us-east-1.rds.amazonaws.com",
//     port: "3306",
//     user: "siud",
//     password: "Maoz6068804!",
//     database: "siud",
// });