const lista_produtos = {
  produtos: [
    {
      id: 1,
      descricao: "Arroz parboilizado 5Kg",
      valor: 25.0,
      marca: "Tio João",
    },
    { id: 2, descricao: "Maionese 250gr", valor: 7.2, marca: "Helmans" },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.5, marca: "Itambé" },
    {
      id: 4,
      descricao: "Batata Maior Palha 300gr",
      valor: 15.2,
      marca: "Chipps",
    },
    { id: 5, descricao: "Nescau 400gr", valor: 8.0, marca: "Nestlé" },
  ],
};

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.params;
      const produto = lista_produtos.produtos.filter((el) => el.id != id);

      return res
        .status(produto ? 200 : 404)
        .json(
          produto
            ? { mensagem: "Produto removido com sucesso." }
            : { mensagem: "Nenhum produto com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível apagar o produto.",
        error: e,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { descricao, valor, marca } = req.body;

      var produto = lista_produtos.produtos.find((produto) => produto.id == id);

      if (descricao) produto.descricao = descricao;
      if (valor) produto.valor = valor;
      if (marca) produto.marca = marca;

      return res
        .status(produto ? 200 : 404)
        .json(
          produto
            ? produto
            : { mensagem: "Nenhum produto com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível atualizar o produto.",
        error: e,
      });
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;

      const produto = lista_produtos.produtos.find(
        (produto) => produto.id == id
      );

      return res
        .status(produto ? 200 : 404)
        .json(
          produto
            ? produto
            : { mensagem: "Nenhum produto com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o produto.",
        error: e,
      });
    }
  },

  async readAll(_req, res) {
    try {
      return res.status(200).json(lista_produtos.produtos);
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível retornar os produtos.",
        error: e,
      });
    }
  },

  async create(req, res) {
    const { descricao, valor, marca } = req.body;

    var produtos = lista_produtos.produtos;
    const produto = {
      id: 6,
      descricao: descricao,
      valor: valor,
      marca: marca,
    };
    produtos.push(produto);
    return res.json(produto);
  },
};
