import { Sequelize } from "sequelize";
import { creactEmpModel } from "../model/empSchema.js";

let Employee =null;
const dbconnect = async (database, username, Password) => {
  const sequelize = new Sequelize(database, username, Password, {
    host: "localhost",
    dialect: "postgres",
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    Employee = await creactEmpModel(sequelize);
    sequelize.sync({alter:true})
    console.log("Table sync succressfully")
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export { dbconnect,Employee };
