import React, { useEffect } from 'react';
import css from './card.module.scss';
import axios from 'axios';
import { URL_POKEMON } from '../../../api/apiRest';


export default function Card({ card }) {


  useEffect(() => {
    const dataPokemon = async() => {
        const api = await axios.get(`${URL_POKEMON}`)

        console.log(api);
    }

    dataPokemon()

  }, [])
  

  return (
    <div>
        <img src='' alt='pokemon'/>
    </div>
  )
}
