const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
  const apiInfo = await apiUrl.data.results;
  let allPokemons = [];
  for (let i = 0; i < apiInfo.length; i++) {
    await axios.get(apiInfo[i].url).then((r) =>
      allPokemons.push({
        id: r.data.id,
        name: r.data.name,
        hp: r.data.stats[0].base_stat,
        atk: r.data.stats[1].base_stat,
        def: r.data.stats[2].base_stat,
        speed: r.data.stats[5].base_stat,
        height: r.data.height,
        weight: r.data.weight,
        img: r.data.sprites.other.home.front_default,
        glimmeryImg: r.data.sprites.other.home.front_shiny,
        Types: r.data.types.map((e) => e.type),
      })
    );
  }
  return allPokemons;
};

const getDbinfoId = async (id) => {
  const pokes = await Pokemon.findAll({
    where: {
      id: id,
    },
    include: {
      model: Type,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
  return pokes;
};

const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbinfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const getDbinfo = async () => {
  const pokes = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
  return pokes;
};

module.exports = { getApiInfo, getDbinfo, getAllPokemons, getDbinfoId };
