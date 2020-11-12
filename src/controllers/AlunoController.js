import Aluno from '../models/Aluno';
import Foto from '../models/Foto';


export default new class AlunoController {
  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      return res.json(aluno);
    } catch(e) {
      return res.status(400).json({ errors: e.errors.map(error => error.message) });
    };
  }; 

  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'altura', 'peso', 'idade'],
      order: [['id', 'ASC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename']
      }
    });
    return res.json(alunos);
  };

  async show(req, res) {
    try {
      const { id } = req.params;
      
      if(!id) {
        return res.status(400).json({ errors: ['Faltando ID']});
      };

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'altura', 'peso', 'idade'],
        order: [['id', 'ASC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename']
        }
      });

      if(!aluno) {
        return res.status(400).json({ errors: ['Aluno não existe'] });
      };

      return res.json(aluno);

    } catch(error) {
      return res.status(400).json({ errors: error.errors.map(error => error.message) });
    };
  };

  async update(req, res) {
    try {
      const { id } = req.params;
      
      if(!id) {
        return res.status(400).json({ errors: ['Faltando ID']});
      };

      const aluno = await Aluno.findByPk(id);

      if(!aluno) {
        return res.status(400).json({ errors: ['Aluno não existe'] });
      };

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);

    } catch(error) {
      return res.status(400).json({ errors: error.errors.map(error => error.message) });
    };
  };

  async delete(req, res) {
    try {
      const { id } = req.params;
      
      if(!id) {
        return res.status(400).json({ errors: ['Faltando ID']});
      };

      const aluno = await Aluno.findByPk(id);

      if(!aluno) {
        return res.status(400).json({ errors: ['Aluno não existe'] });
      };

      await aluno.destroy();
      return res.json({ message: "O usuário foi apagado com sucesso."});
      
    } catch(error) {
      return res.status(400).json({ errors: error.errors.map(error => error.message) });
    };
  };
};