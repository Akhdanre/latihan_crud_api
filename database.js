const pg = require("pg")

function newDb() {
   return new pg.Pool({
      host: "localhost",
      user: "postgres",
      password: "root",
      port: 5432,
      database: "latihan_crud_api_db"
   })
}



module.exports = {
   newDb
}