const sqliteConnection = require("../../sqlite");
const createUsersTable = require("./createUsersTable");

async function migrationRun() {
  const schemas = [createUsersTable].join("");

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.log(error));
}

module.exports = migrationRun;
