const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Pokemon, Type } = require("../db.js");
const {
  getApiInfo,
  getDbinfo,
  getAllPokemons,
  getDbinfoId,
} = require("./helper");
const { v4: uuid } = require("uuid");
const { types } = require("pg");
const cors = require('cors')

const router = Router();

router.use(cors())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async (req, res) => {
  let name = req.query.name;
  let pokemonsTotal = await getAllPokemons();
  if (name) {
    const pokemonDbName = await Pokemon.findAll({
      where: {
        name: name.toLowerCase(),
      },
    });
    if (pokemonDbName.length > 0) {
      res.status(200).send(pokemonDbName);
    } else {
      try {
        let pokemonName = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase()
        );
        res.status(200).send({
          id: pokemonName.data.id,
          name: pokemonName.data.name,
          hp: pokemonName.data.stats[0].base_stat,
          atk: pokemonName.data.stats[1].base_stat,
          def: pokemonName.data.stats[2].base_stat,
          speed: pokemonName.data.stats[5].base_stat,
          height: pokemonName.data.height,
          weight: pokemonName.data.weight,
          img: pokemonName.data.sprites.other.home.front_default,
          glimmeryImg: pokemonName.data.sprites.other.home.front_shiny,
          Types: pokemonName.data.types.map((e) => e.type),
        });
      } catch {
        if (name) {
          res
            .status(400)
            .send("No pokemon under the name: " + name + " were found");
        } else {
          res.status(400).send("No pokemons were found");
        }
      }
    }
  } else {
    res.status(200).send(pokemonsTotal);
  }
});

router.get("/pokemons/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let pokemonById = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    if (pokemonById && typeof pokemonById !== "string") {
      res.status(200).send({
        id: pokemonById.data.id,
        name: pokemonById.data.name,
        hp: pokemonById.data.stats[0].base_stat,
        atk: pokemonById.data.stats[1].base_stat,
        def: pokemonById.data.stats[2].base_stat,
        speed: pokemonById.data.stats[5].base_stat,
        height: pokemonById.data.height,
        weight: pokemonById.data.weight,
        img: pokemonById.data.sprites.other.home.front_default,
        glimmeryImg: pokemonById.data.sprites.other.home.front_shiny,
        Types: pokemonById.data.types.map((e) => e.type),
      });
    }
  } catch {
    let pokemonByIdDb = await getDbinfoId(id);
    if (pokemonByIdDb.length > 0) {
      res.status(200).send(pokemonByIdDb[0]);
    } else {
      res.status(400).send("No hay un Pokemon con ese ID");
    }
  }
});

router.get("/types", async (req, res) => {
  const typesDb = await Type.findAll();
  if (typesDb.length < 1) {
    let pokemonTypes = await axios.get("https://pokeapi.co/api/v2/type");
    let allPokemonsTypes = await pokemonTypes.data.results.map((e) => e.name);
    await Promise.all(
      allPokemonsTypes.map(
        async (e) => await Type.create({ name: e, id: uuid() })
      )
    );
    const typesDb2 = await Type.findAll();
    res.status(200).send(typesDb2);
  } else {
    res.status(200).send(typesDb);
  }
});

router.post("/pokemons", async (req, res) => {
  const { name, hp, atk, def, speed, weight, height, type1, type2 } = req.body;
  const t1 = await Type.findByPk(type1);
  const t2 = await Type.findByPk(type2);
  try {
    const newPokemon = await Pokemon.create({
      id: uuid(),
      name: name.toLowerCase(),
      hp: hp,
      atk: atk,
      def: def,
      speed: speed,
      weight: weight,
      height: height,
      img: "https://images3.alphacoders.com/677/thumb-1920-677583.png",
      glimmeryImg: "https://images3.alphacoders.com/677/thumb-1920-677583.png",
    });
    newPokemon.setTypes(t1.id);
    if (type2.length > 0) {
      newPokemon.setTypes(t2.id);
    }
    res.status(200).send(newPokemon);
  } catch {
    res.status(400).send("Hubo un error al crear el Pokemon");
  }
});

router.delete("/pokemons/:id", async (req, res) => {
  let pokemonFound = await Pokemon.destroy({ where: { id: req.params.id } });
  res.status(200).send("Done");
});

module.exports = router;
