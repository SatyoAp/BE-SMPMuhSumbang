import { Sequelize } from "sequelize";
import "../model/index.js";

/**
 *
 * @param {Sequelize} sequelize
 */
export const startSequelize = async (sequelize) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("connection to database successfull");
    console.log(
      `models available in sequelize: ${Object.keys(sequelize.models).join(
        ", "
      )}`
    );
  } catch (e) {
    console.error("connection to database failed", e);
  }
};

// { alter: true }
