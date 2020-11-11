import Usuario from '../models/Usuario';


export default new class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      const { id, nome, email} = novoUsuario;
      return res.json({ id, nome, email });
    } catch(error) {
      return res.status(400).json({ errors: error.errors.map(error => error.message)});
    }
  };


  async update(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.userId);

      if(!usuario) {
        return res.status(400).json({ error: "Usuario nao existe."} );
      };

      const usuarioAtualizado = await usuario.update(req.body);

      const { id, nome, email} = usuarioAtualizado;

      return res.json({ id, nome, email });

    } catch(error) {
      return res.status(400).json({ errors: error.errors.map(error => error.message)});
    };
  };


  async delete(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.userId);

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

