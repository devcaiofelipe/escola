import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import usuarioRoutes from './src/routes/usuarioRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import fotoRoutes from './src/routes/fotoRoutes';
import alunoRoutes from './src/routes/alunoRoutes';
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
    this.server.use('/alunos/', alunoRoutes);
    this.server.use('/fotos/', fotoRoutes);
  };
};


export default new App().server;