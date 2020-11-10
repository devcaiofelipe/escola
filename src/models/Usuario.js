import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';


export default class Usuario extends Model {
  static init(connection) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo "nome" deve ter entre 3 e 255 caracteres.'
          } 
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email ja existe.'
        },
        validate: {
          isEmail: {
            msg: 'Email invalido.'
          }
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      password: {
        type: Sequelize.VIRTUAL,
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha precisa ter entre 6 e 50 caracteres.'
          } 
        }
      }
    }, { sequelize: connection });

    this.addHook('beforeSave', async (user) => {
      if(user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      };
    })
    return this;
  };

  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash);
  };
};