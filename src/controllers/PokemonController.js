const knex = require("knex")({
  client: "pg",
  debug: true,
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

module.exports = {
  delete(req, res) {
    const { id } = req.params;
    knex
      .from("pokemon")
      .where({ id })
      .del()
      .then((_pokemons) =>
        res.status(200).json({ mensagem: "Pokemon removido com sucesso." })
      )
      .catch((err) => {
        res.status(500).json({
          message: "Erro ao apagar o pokemon - " + err.message,
        });
      });
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      attack,
      defense,
      description,
      evolutionChain0name,
      evolutionChain1name,
      height,
      imageUrl,
      name,
      type,
      weight,
    } = req.body;

    var pokemon = {};

    if (attack) pokemon.attack = attack;
    if (defense) pokemon.defense = defense;
    if (description) pokemon.description = description;
    pokemon.evolutionchain0id = Math.floor(
      Math.random() * 10 * Math.random() * 100
    );
    if (evolutionChain0name) pokemon.evolutionchain0name = evolutionChain0name;
    pokemon.evolutionchain1id = Math.floor(
      Math.random() * 10 * Math.random() * 100
    );
    if (evolutionChain1name) pokemon.evolutionchain1name = evolutionChain1name;
    if (height) pokemon.height = height;
    if (imageUrl) pokemon.imageurl = imageUrl;
    if (name) pokemon.name = name;
    if (type) pokemon.type = type;
    if (weight) pokemon.weight = weight;
    knex("pokemon")
      .returning([
        "attack",
        "defense",
        "description",
        "evolutionchain0id",
        "evolutionchain0name",
        "evolutionchain1id",
        "evolutionchain1name",
        "height",
        "id",
        "imageurl",
        "name",
        "type",
        "weight",
      ])
      .update(pokemon)
      .where({ id })
      .then((pokemons) => res.status(200).json(pokemons))
      .catch((err) => {
        res.status(500).json({
          message: "Erro ao recuperar os pokemons - " + err.message,
        });
      });
  },

  read(req, res) {
    const { id } = req.params;
    knex
      .select("*")
      .from("pokemon")
      .where({ id })
      .then((pokemons) => res.status(200).json(pokemons))
      .catch((err) => {
        res.status(500).json({
          message: "Erro ao recuperar o pokemon - " + err.message,
        });
      });
  },

  readAll(_req, res) {
    knex
      .select("*")
      .from("pokemon")
      .orderBy('id', 'asc')
      .then((pokemons) => res.status(200).json(pokemons))
      .catch((err) => {
        res.status(500).json({
          message: "Erro ao recuperar os pokemons - " + err.message,
        });
      });
  },

  async create(req, res) {
    const {
      attack,
      defense,
      description,
      evolutionChain0name,
      evolutionChain1name,
      height,
      imageUrl,
      name,
      type,
      weight,
    } = req.body;

    var pokemon = {};

    if (attack) pokemon.attack = attack;
    if (defense) pokemon.defense = defense;
    if (description) pokemon.description = description;
    pokemon.evolutionchain0id = Math.floor(
      Math.random() * 10 * Math.random() * 100
    );
    if (evolutionChain0name) pokemon.evolutionchain0name = evolutionChain0name;
    pokemon.evolutionchain1id = Math.floor(
      Math.random() * 10 * Math.random() * 100
    );
    if (evolutionChain1name) pokemon.evolutionchain1name = evolutionChain1name;
    if (height) pokemon.height = height;
    if (imageUrl) pokemon.imageurl = imageUrl;
    if (name) pokemon.name = name;
    if (type) pokemon.type = type;
    if (weight) pokemon.weight = weight;
    knex("pokemon")
      .returning([
        "attack",
        "defense",
        "description",
        "evolutionchain0id",
        "evolutionchain0name",
        "evolutionchain1id",
        "evolutionchain1name",
        "height",
        "id",
        "imageurl",
        "name",
        "type",
        "weight",
      ])
      .insert(pokemon)
      .then((pokemons) => res.status(200).json(pokemons))
      .catch((err) => {
        res.status(500).json({
          message: "Erro ao inserir o pokemons - " + err.message,
        });
      });
  },
};
