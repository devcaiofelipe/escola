import Sequelize, { Model } from 'sequelize';


export default new class Aluno {
  static init(connection) {
    super.init({
      nome: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      email: Sequelize.STRING,
      idade: Sequelize.INTEGER,
      peso: Sequelize.FLOAT,
      altura: Sequelize.FLOAT
    }, { sequelize: connection });
    return this;
  };
};