const express = require("express");
const PokemonController = require("./controllers/PokemonController");

const routes = express.Router();

////////////////////////////////////////////////////////////////CRUD - POKEMON////////////////////////////////////////////////////////////////
routes.post("/pokemon", PokemonController.create);
routes.get("/pokemon", PokemonController.readAll);
routes.get("/pokemon/:id", PokemonController.read);
routes.put("/pokemon/:id", PokemonController.update);
routes.delete("/pokemon/:id", PokemonController.delete);
////////////////////////////////////////////////////////////////CRUD - POKEMON////////////////////////////////////////////////////////////////
module.exports = routes;