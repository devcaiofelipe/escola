import Usuario from '../models/Usuario';


export default new class UsuarioController {
  async store(req, res) {

    try {
      const novoUsuario = await Usuario.create(req.body);

      return res.json(novoUsuario);
    } catch(error) {
      return res.status(400).json({ errors: error.errors.map(error => error.message)});
    }
  };


  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      return res.json(usuarios);
    } catch(error) {
      return res.json(null);
    };
  };


  async show(req, res) {
    try {
      const user = await Usuario.findByPk(req.params.id);
      return res.json(user);
    } catch (error) {
      return res.json(null);
    };
  };

  
  async update(req, res) {
    try {
      if(!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado']
        });
      };

      const usuario = await Usuario.findByPk(req.params.id);

      if(!usuario) {
        return res.status(400).json({ error: "Usuario nao existe."} );
      };

      const usuarioAtualizado = await usuario.update(req.body);

      return res.json(usuarioAtualizado);

    } catch(error) {
      return res.status(400).json({ errors: error.errors.map(error => error.message)});
    };
  };

  async delete(req, res) {
    try {
      if(!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado']
        });
      };

      const usuario = await Usuario.findByPk(req.params.id);

      if(!usuario) {
        return res.status(400).json({ error: "Usuario nao existe."} );
      };

      await usuario.destroy();

      return res.json({ message: "Usuário deletado com sucesso."});

    } catch(error) {
      return res.status(400).json({ errors: error.errors.map(error => error.message)});
    };
  };
};

