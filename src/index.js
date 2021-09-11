import app from "./server";
import mongoose from "mongoose";

const dbUrl = "mongodb://root:password@mongo:27017";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.server();
  })
  .catch((err) => {
    console.error("App starting error:", err.stack);
    process.exit(1);
  });

export default app;
