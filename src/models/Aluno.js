import Sequelize, { Model } from 'sequelize';


export default class Aluno extends Model {
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