import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';


export default async (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(401).json({
      erros: ['Login required']
    });
  };

  const [, token] = authorization.split(' ');
  
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = dados;
    console.log(dados)

    const usuarioExiste = await Usuario.findOne({ where: { id, email } });

    if(!usuarioExiste) {
      return res.status(401).json({
        erros: ['Usuário inválido']
      });
    };


    req.userId = id;
    req.userEmail = email;
    return next();
    
  } catch(error) {
    return res.status(401).json({
      erros: ['Invalid token']
    });
  };
};