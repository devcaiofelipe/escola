import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';


export default new class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(401).json({ errors: ["Você precisa enviar email e senha."] });
    };

    const usuario = await Usuario.findOne({ where: { email }});

    if(!usuario) {
      return res.status(404).json({ errors: ['Usuário não existe'] })
    };

    if(!(await usuario.passwordIsValid(password))) {
      return res.status(401).json({ errors: ['Senha inválida'] })
    };

    const { userId } = usuario;
    const token = jwt.sign({ userId, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    });

    return res.json({ token: token });
  };
}