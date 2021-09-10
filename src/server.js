import express from "express";
import { router } from "./routers";

class Server {
  constructor() {
    this.app = express();
    this.setRoutes()
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
