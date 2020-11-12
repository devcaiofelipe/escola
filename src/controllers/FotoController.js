export default new class Foto {
  async store(req, res) {
    return res.json(req.file);
  };
};
