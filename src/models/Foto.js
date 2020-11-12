import Sequelize, { Model } from 'sequelize';


export default class Foto extends Model {
  static init(connection) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            message: "Campo não pode ficar vazio"
          }
        }
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            message: 'Campo não pode ficar vazio'
          }
        }
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3333/${this.getDataValue('filename')}`;
        }
      }
    }, { sequelize: connection });
    return this;
  };

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  };
};