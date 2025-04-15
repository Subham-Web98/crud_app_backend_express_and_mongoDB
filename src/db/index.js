import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connectionName = await mongoose.connect(
      `${process.env.DB_URL}/${process.env.DB_NAME}`
    );
    console.info(
      `"Database connected" ${connectionName.connection.name} on "${connectionName.connection.host}" at port "${connectionName.connection.port}"`
    );
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit(1);
  }
};

export default dbConnection;
