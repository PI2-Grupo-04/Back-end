import express from "express";

class Server {
  constructor() {
    this.app = express();
    this.server();
  }

  server() {
    this.app.listen(3333);
  }
}

export default new Server();
