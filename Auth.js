import { Database } from "./Database.js";

class Auth extends Database {
  DB;
  constructor() {
    super();
    this.DB = this.dbConfig();
  }

  checkAuth = async (req) => {
    const { userId, passport } = req;
    let authData = await this.getAuthenticationData(userId, passport);
    if (authData.status != "success") {
      return authData;
    }

    if (authData.data.passport == passport) {
      return authData;
    } else {
      return {
        status: "failed",
        msg: "Wrong credentials or missing access rights to application",
      };
    }
  };

  getAuthenticationData = async (userId = "") => {
    try {
      let retriveData = await this.DB("dbt_user_authentication")
        .where("user_id", userId)
        .select(["id", "passport"]);

      if (retriveData.length == 0) {
        return new Promise((resolved) => {
          resolved({
            status: "failed",
            msg: "Wrong credentials or missing access rights to application",
          });
        });
      } else {
        return new Promise((resolved) => {
          resolved({
            status: "success",
            data: retriveData,
          });
        });
      }
    } catch (error) {
      return new Promise((resolved) => {
        resolved({ status: "failed", msg: error.message });
      });
    }
  };
}

const auth = new Auth();
export { auth };
