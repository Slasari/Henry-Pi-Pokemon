import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    let json = await axios.get("https://pi-pokemon-api-opal.vercel.app/pokemons", {});
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function DeletePokemon(id) {
  return async function(dispatch) {
    let deleted = await axios.delete("https://pi-pokemon-api-opal.vercel.app/pokemons/" + id)
  }
}

export function getAllPokemons() {
  return async function (dispatch) {
    return dispatch({
      type: "GET_ALL_POKEMONS",
    });
  };
}
export function getTypes() {
  return async function (dispatch) {
    let json = await axios.get("https://pi-pokemon-api-opal.vercel.app/types", {});
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "https://pi-pokemon-api-opal.vercel.app/pokemons",
      payload
    );
    return response;
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("https://pi-pokemon-api-opal.vercel.app/pokemons?name=" + name);
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (e) {
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: e.response.data,
      });
    }
  };
}

export function filterPerTypes(payload) {
  return {
    type: "FILTER_TYPES",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`https://pi-pokemon-api-opal.vercel.app/pokemons/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
