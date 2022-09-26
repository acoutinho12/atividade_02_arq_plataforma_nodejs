const express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const PokemonController = require("./controllers/PokemonController");

const routes = express.Router();

////////////////////////////////////////////////////////////////CRUD - POKEMON////////////////////////////////////////////////////////////////
routes.post("/pokemon", jsonParser, PokemonController.create);
routes.get("/pokemon", PokemonController.readAll);
routes.get("/pokemon/:id", PokemonController.read);
routes.put("/pokemon/:id", jsonParser, PokemonController.update);
routes.delete("/pokemon/:id", PokemonController.delete);
////////////////////////////////////////////////////////////////CRUD - POKEMON////////////////////////////////////////////////////////////////
module.exports = routes;
