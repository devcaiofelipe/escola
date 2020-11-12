import multerConfig from '../config/multer';
import multer from 'multer';
import Foto from '../models/Foto';


const upload = multer(multerConfig).single('foto');


export default new class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if(error) {
        return res.status(400).json({ errors: error.code });
      };

      try {
        const { originalname, filename } = req.file;
        console.log(originalname, filename)
        const { aluno_id } = req.body;

        const foto = await Foto.create({ originalname, filename, aluno_id });
        return res.json(foto);
      } catch(error) {
        return res.status(400).json({
          errors: ['Aluno não existe']
        });
      };
    });
  };
};
