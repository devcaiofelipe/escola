import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import usuarioRoutes from './src/routes/usuarioRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
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
    this.server.use('/users/', usuarioRoutes);
    this.server.use('/tokens/', tokenRoutes);
  };
};


export default new App().server;