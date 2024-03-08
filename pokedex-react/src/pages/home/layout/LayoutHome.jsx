import React, { useEffect, useState } from 'react';
import css from './layout.module.scss';
import Header from '../header/Header';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import { URL_POKEMON } from '../../../api/apiRest';
import Card from "../card/Card";

export default function LayoutHome() {
  // State pour stocker la data
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [xpage, setXpage] = useState(1);
  const [search, setSearch] = useState('');


  // Recup' la data dès que xpage ou search change
  useEffect(() => {
    // Call API et avor ts les poke
    const api = async () => {

      const limit = 15;
      const xp = (xpage - 1) * limit; // calcul de pagination
      const apiPoke = await axios.get(
        `${URL_POKEMON}?offset=${xp}&limit=${limit}`
      );

      setArrayPokemon(apiPoke.data.results);
    };

    api();
    getGlobalPokemons();
  }, [xpage, search]);

// Appel tous les Pokemon depuis l'API  
  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);

    const promises = res.data.results.map((pokemon) => {
      return pokemon;
    });

    const results = await Promise.all(promises);
    setGlobalPokemon(results);
  };

  // Filtre les Poke lors de la recherche
  const filterPokemons = search?.length > 0 
  ? globalPokemon?.filter(pokemon =>  pokemon?.name?.includes(search))
  : arrayPokemon


  // obtenir la valeur recherchée et maj les states
  const obtenirSearch = (e) => {

    const text = e.toLowerCase()
    setSearch(text)
    setXpage(1) //Réinit à la 1er page lors d'une nouvelle recherche
  }

  return (
    <div className={css.layout} >
      <Header obtenirSearch={obtenirSearch}/>

      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span className={css.item_gauche}
          
          onClick={() => {
            if (xpage === 1) {
              return console.log("Ne peux pas revenir en arrière");
            }
            setXpage(xpage - 1);
          }}
          
          >
            <FaIcons.FaAngleLeft />
          </span>
          <span className={css.item}> {xpage} </span>
          <span className={css.item}> à </span>
          <span className={css.item}>
            {" "}
            {Math.round(globalPokemon?.length / 15)}{" "}
          </span>
          <span
            className={css.item_droit}
            onClick={() => {
              if (xpage === 67) {
                return console.log("c'est la dernière page");
              }
              setXpage(xpage + 1);
            }}
          >
            {" "}
            <FaIcons.FaAngleRight />{" "}
          </span>
        </div>
      </section>
      <div className={css.card_content}>
        {filterPokemons.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  )
}
