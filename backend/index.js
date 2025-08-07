const app = require("./app.js");
const connectToDB = require("./src/config/db.js");

connectToDB(app);