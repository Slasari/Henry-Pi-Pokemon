import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes, getAllPokemons } from "../actions/index";
import Style from "./PokemonCreate.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "A name is required";
  } else if (input.name.length > 28) {
    errors.name = "Choose a shorter name";
  } else if (input.hp < 1 || input.hp > 150 || input.hp === " ") {
    errors.hp = "Hp must be a number (1 - 150)";
  } else if (input.atk < 1 || input.atk > 150 || input.atk === " ") {
    errors.atk = "Atk must be a number (1 - 150)";
  } else if (input.def < 1 || input.def > 150 || input.def === " ") {
    errors.def = "Def must be a number (1 - 150)";
  } else if (input.speed < 1 || input.speed > 150 || input.speed === " ") {
    errors.speed = "Speed must be a number (1 - 150)";
  } else if (input.height < 1 || input.height > 150 || input.height === " ") {
    errors.height = "Height must be a number (1 - 150)";
  } else if (input.weight < 1 || input.weight > 150 || input.weight === " ") {
    errors.weight = "Weight must be a number (1 - 150)";
  } else if (!input.type1) {
    errors.type1 = "A type is required";
  } else if (!input.type2 && !input.type1) {
    errors.type1 = "A type is required";
  }
  return errors;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    id: "",
    name: "",
    hp: "",
    atk: "",
    def: "",
    speed: "",
    height: "",
    weight: "",
    type1: "",
    type2: "",
    typesName1: "",
    typesName2: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    let var1 = types.filter((a) => a.id === e.target.value);
    setInput({
      ...input,
      type1: e.target.value,
      typesName1: var1[0].name,
    });
    setErrors(
      validate({
        ...input,
        type1: e.target.value,
        typesName1: var1[0].name,
      })
    );
  }

  function handleSelect2(e) {
    let var1 = types.filter((a) => a.id === e.target.value);
    setInput({
      ...input,
      type2: e.target.value,
      typesName2: var1[0].name,
    });
    setErrors(
      validate({
        ...input,
        type2: e.target.value,
        typesName2: var1[0].name,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert("Your pokemon was successfully created!");
    setInput({
      id: "",
      name: "",
      hp: "",
      atk: "",
      def: "",
      speed: "",
      height: "",
      weight: "",
      type1: "",
      type2: "",
      typesName1: "",
      typesName2: "",
    });
    history.push("/home");
    dispatch(getAllPokemons())
  }

  useEffect(() => {
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={Style.background2}></div>
      <div className={Style.background1}></div>
      <Link to="/home">
        <button className={Style.but}>Back</button>
      </Link>
      <div className={Style.form1}>
        {/*       <h1 className={Style.title1}>Create Your Pokemon</h1> */}
        <div className={Style.containerForm2}>
          <div className={Style.form2}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={Style.FormDiv1}>
                <label>Name</label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder="Name..."
                  onChange={(e) => handleChange(e)}
                />
                {errors.name && (
                  <p className={Style.errorName}>{errors.name}</p>
                )}
              </div>
              <div className={Style.FormDiv1}>
                <label>HP</label>
                <input
                  type="number"
                  value={input.hp}
                  name="hp"
                  placeholder="Hp..."
                  onChange={(e) => handleChange(e)}
                />
                {errors.hp && <p className={Style.errorHp}>{errors.hp}</p>}
              </div>
              <div className={Style.FormDiv1}>
                <label>ATK</label>
                <input
                  type="number"
                  value={input.atk}
                  name="atk"
                  placeholder="Atk..."
                  onChange={(e) => handleChange(e)}
                />
                {errors.atk && <p className={Style.errorAtk}>{errors.atk}</p>}
              </div>
              <div className={Style.FormDiv1}>
                <label>DEF</label>
                <input
                  type="number"
                  value={input.def}
                  name="def"
                  placeholder="Def..."
                  onChange={(e) => handleChange(e)}
                />
                {errors.def && <p className={Style.errorDef}>{errors.def}</p>}
              </div>
              <div className={Style.FormDiv1}>
                <label>SPEED</label>
                <input
                  type="number"
                  value={input.speed}
                  name="speed"
                  placeholder="Speed..."
                  onChange={(e) => handleChange(e)}
                />
                {errors.speed && (
                  <p className={Style.errorSpd}>{errors.speed}</p>
                )}
              </div>
              <div className={Style.FormDiv1}>
                <label>HEIGHT</label>
                <input
                  type="number"
                  value={input.height}
                  name="height"
                  placeholder="Height..."
                  onChange={(e) => handleChange(e)}
                />
                {errors.height && (
                  <p className={Style.errorHeight}>{errors.height}</p>
                )}
              </div>
              <div className={Style.FormDiv1}>
                <label>WEIGHT</label>
                <input
                  type="number"
                  value={input.weight}
                  name="weight"
                  placeholder="Weight..."
                  onChange={(e) => handleChange(e)}
                />
                {errors.weight && (
                  <p className={Style.errorWeight}>{errors.weight}</p>
                )}
              </div>
              <div className={Style.typesSelect1}>
                <select
                  onChange={(e) => handleSelect(e)}
                  className={Style.typesNameInput}
                >
                  {types
                    ?.filter((j) => j.id !== input.type2)
                    .map((e) => (
                      <option value={e.id} name={e.name} key={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
                <select
                  onChange={(e) => handleSelect2(e)}
                  className={Style.typesNameInput}
                >
                  {types
                    ?.filter((h) => h.id !== input.type1)
                    .map((e) => (
                      <option value={e.id} name={e.name} key={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
                {errors.type1 && (
                  <p className={Style.errorType}>{errors.type1}</p>
                )}
              </div>
              <div>
                <ul>
                  <li>{input.typesName1}</li>
                </ul>
                <ul>
                  <li>{input.typesName2}</li>
                </ul>
              </div>
            </form>
          </div>
          <div className={Style.formBtn}>
            <form onSubmit={(e) => handleSubmit(e)}>
              {input.name.length > 0 &&
              input.hp.length > 0 &&
              input.atk.length > 0 &&
              input.def.length > 0 &&
              input.speed.length > 0 &&
              input.height.length > 0 &&
              input.weight.length > 0 &&
              !errors.length > 0 &&
              (input.typesName1.length > 0 || input.typesName2.length) > 0 ? (
                <div className={Style.createBtnDiv1}>
                  <button type="submit" className={Style.createBtn1}>
                    <span className={Style.span1}>Create Pokemon</span>
                  </button>
                </div>
              ) : (
                <div className={Style.createBtnDiv1}>
                  <button
                    type="button"
                    className={Style.createBtn1}
                    onClick={() =>
                      alert("You must complete the form to create a Pokemon")
                    }
                  >
                    <span> Create Pokemon</span>
                  </button>
                </div>
              )}
            </form>
            </div>
            <div>
            <div className={Style.div1}>
              <form className={Style.letra1}>
                <div className={Style.letra4}>
                  <h1 className={Style.letra5}>ID</h1>
                </div>
                <div className={Style.namefixed}>
                  <h1 className={Style.invisible}>Name</h1>
                  <h1 className={Style.letra2}>{input.name}</h1>
                  <h1 className={Style.invisible}>Name</h1>
                </div>
                <img
                  src={
                    "https://images3.alphacoders.com/677/thumb-1920-677583.png"
                  }
                  alt="img not found"
                  width="200px"
                  height="250px"
                ></img>
                <img
                  src={
                    "https://images3.alphacoders.com/677/thumb-1920-677583.png"
                  }
                  alt="img not found"
                  width="200px"
                  height="250px"
                ></img>
                <div className={Style.letra5}>
                  <h1 className={Style.invisible}>Name</h1>
                  {input && input.typesName1 && (
                    <div>
                      <h1 className={Style.letra2}>{input?.typesName1}</h1>
                    </div>
                  )}
                  {input && input.typesName2 && input.typesName2 && (
                    <h1 className={Style.letra2}>/{input?.typesName2}</h1>
                  )}
                  <h1 className={Style.invisible}>Name</h1>
                </div>
                <div className={Style.letra4}>
                  <h1 className={Style.hp}>hp</h1>
                  <h1>{input.hp}</h1>
                </div>
                <div></div>
                <div className={Style.letra4}>
                  <h1 className={Style.atk}>atk</h1>
                  <h1 className={Style.letra3}>{input.atk}</h1>
                </div>
                <div className={Style.letra4}>
                  <h1 className={Style.def}>def</h1>
                  <h1 className={Style.letra3}>{input.def}</h1>
                </div>
                <div className={Style.letra4}>
                  <h1 className={Style.vel}>speed</h1>
                  <h1 className={Style.letra3}>{input.speed}</h1>
                </div>
                <div className={Style.letra4}>
                  <h1 className={Style.height}>height</h1>
                  <h1 className={Style.letra3}>{input.height}</h1>
                </div>
                <div className={Style.letra4}>
                  <h1 className={Style.weight}>weight</h1>
                  <h1 className={Style.letra3}>{input.weight}</h1>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
