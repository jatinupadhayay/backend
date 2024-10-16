const pg = require("pg");
const { Client } = pg;
const client = new Client({
  user: "postgres",
  password: "Jatin@465697",
  host: "localhost",
  port: 5432,
  database: "jatinpandit",
});
client.connect();

module.exports = client;
