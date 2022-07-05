const initialState = {
  pokemons: [],
  Allpokemons: [],
  types: [],
  detail: [],
  error: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        Allpokemons: action.payload,
        error: "",
      };
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        error: "",
        pokemons: [...state.Allpokemons],
      };
    case "GET_NAME_POKEMONS":
      if (
        typeof action.payload === "string" &&
        action.payload.slice(0, 26) === "No pokemon under the name:"
      ) {
        return {
          ...state,
          pokemons: [],
          error: "No pokemon under the name:",
        };
      }
      return {
        ...state,
        pokemons: [action.payload],
        error: "",
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
        error: "",
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
        error: "",
      };
    case "POST_POKEMON":
      return {
        ...state,
        error: "",
      };
    case "FILTER_TYPES":
      const typesFilter = [...state.Allpokemons].filter(
        (e) =>
          e.Types[0].name === action.payload ||
          e.Types[1]?.name === action.payload
      );
      if (typesFilter.length > 0) {
        return {
          ...state,
          error: "",
          pokemons:
            action.payload === "All types" ? state.Allpokemons : typesFilter,
        };
      } else {
        return {
          ...state,
          error: action.payload === "All types" ? "" : "filter_types error",
          pokemons:
            action.payload === "All types" ? state.Allpokemons : typesFilter,
        };
      }
    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.Allpokemons.filter((e) => e.createdInDb)
          : state.Allpokemons.filter((e) => !e.createdInDb);
      return {
        ...state,
        error:
          action.payload === "created"
            ? state.Allpokemons.filter((e) => e.createdInDb).length > 0
              ? ""
              : "No pokemons created"
            : "",
        pokemons: action.payload === "All" ? state.Allpokemons : createdFilter,
      };
    case "ORDER_BY_NAME":
      const sortedArr =
        action.payload === "asc"
          ? [...state.pokemons].sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : [...state.pokemons].sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
            });
      return {
        ...state,
        pokemons: action.payload === "All" ? [...state.Allpokemons] : sortedArr,
        error: "",
      };
    case "ORDER_BY_ATTACK":
      const sortedArr2 =
        action.payload === "atk>"
          ? [...state.pokemons].sort(function (a, b) {
              if (a.atk > b.atk) {
                return 1;
              }
              if (b.atk > a.atk) {
                return -1;
              }
              return 0;
            })
          : [...state.pokemons].sort(function (a, b) {
              if (a.atk > b.atk) {
                return -1;
              }
              if (b.atk > a.atk) {
                return 1;
              }
            });
      return {
        ...state,
        pokemons:
          action.payload === "All" ? [...state.Allpokemons] : sortedArr2,
        error: "",
      };
    default:
      return state;
  }
}

export default rootReducer;
