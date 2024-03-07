import React, { useEffect, useState } from 'react';
import css from './card.module.scss';
import axios from 'axios';
import { URL_ESPECIES, URL_POKEMON,URL_EVOLUCIONES, } from '../../../api/apiRest';


export default function Card({ card }) {
  const [itemPokemon, setItemPokemon] = useState({});  
  const [especiePokemon, setEspeciePokemon] = useState({});
  const [evoluciones, setEvoluciones] = useState([]);
  
  useEffect(() => {
    const dataPokemon = async() => {
        const api = await axios.get(`${URL_POKEMON}/${card.name}`);

        setItemPokemon(api.data);
    };
    dataPokemon();
  }, [card]);

  useEffect(() => {
    const dataEspecie = async () => {
      const URL = card.url.split("/");

      const api = await axios.get(`${URL_ESPECIES}/${URL[6]}`);
      setEspeciePokemon({
        url_especie: api?.data?.evolution_chain,
        data: api?.data,
      });
    };
    dataEspecie();
  }, [card]);

  useEffect(() => {
    async function getPokemonImage(id) {
      const response = await axios.get(`${URL_POKEMON}/${id}`);
      return response?.data?.sprites?.other["official-artwork"]?.front_default;
    }



    if (especiePokemon?.url_especie) {

      const obtenirEvoluciones = async () => {
        const arrayEvoluciones = [];
        const URL = especiePokemon?.url_especie?.url.split("/");
        const api = await axios.get(`${URL_EVOLUCIONES}/${URL[6]}`);

        const URL2 = api?.data?.chain?.species?.url?.split("/");
        console.log(URL2)

        const img1 = await getPokemonImage(URL2[6]);

        arrayEvoluciones.push({
          img: img1,
          name: api?.data?.chain?.species?.name,
        });






      };



      obtenirEvoluciones();
    }
  }, [especiePokemon]);





  let pokeId = itemPokemon?.id?.toString();
  if (pokeId?.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId?.length === 2) {
    pokeId = "0" + pokeId;
  }
  return (
    <div className={css.card} >
        <img 
            className={css.img_poke} 
            src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} 
            alt="pokemon"
        />
        <div className= { `bg-${especiePokemon?.data?.color?.name}  ${css.sub_card}` } >
            <strong className={css.id_card} > {pokeId} </strong>
            <strong className={css.name_card}> {itemPokemon.name} </strong>
            <h4 className={css.hauteur_poke} > Hauteur : {itemPokemon.height}0 Cm </h4>
            <h4 className={css.poids_poke} > Poids : {itemPokemon.weight} Kg </h4>
            <h4 className={css.habitat_poke} > Habitat : {especiePokemon?.data?.habitat?.name} </h4>

            <div className={css.div_stats}>
              {itemPokemon?.stats?.map((sta, index) => {
                return (
                  <h6 key={index} className={css.item_stats}>
                    <span className={css.name}> {sta.stat.name} </span>
                    <progress value={sta.base_stat} max={110}></progress>
                    <span className={css.numero}> {sta.base_stat} </span>
                  </h6>
                );
              })}
            </div>

            <div className={css.div_type_color}>
              {itemPokemon?.types?.map((ti, index) => {
                return (
                  <h6
                  key={index}
                  className={`color-${ti.type.name}  ${css.color_type} `}
                  >
                    {" "}
                    {ti.type.name}{" "}
                  </h6>
                );
              })}
            </div>


        </div>
    </div>
  );
}
