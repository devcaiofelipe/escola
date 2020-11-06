import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import './src/database';


class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  };

  middlewares() {
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
  };

  routes() {
    this.server.use('/', homeRoutes);
  };
};


export default new App().server;