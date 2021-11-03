import express from "express";
import { router } from "./routers";
import { config } from "dotenv";
import cors from "./services/cors";

class Server {
  constructor() {
    config();
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors);
    this.setRoutes();
  }
  setRoutes() {
    this.app.use(router);
  }
  server() {
    this.app.listen(3000, () => {
      console.log(`App starts on http://localhost:3000/`);
    });
  }
}

export default new Server();
