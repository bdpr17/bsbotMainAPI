import knex from "knex";
import dotenv from "dotenv";
dotenv.config();
class Database {
  dbConfig = () => {
    return knex({
      client: process.env.dbclnt,
      connection: {
        host: process.env.dbhost,
        user: process.env.dbuser,
        port: process.env.dbport,
        password: process.env.dbpass ?? "",
        database: process.env.dbname,
      },
    });
  };
}
export { Database };
