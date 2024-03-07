import React, { useEffect } from 'react'
import css from './layout.module.scss'
import Header from '../header/Header'
import axios from 'axios'
import { URL_POKEMON } from '../../../api/apiRest'

export default function LayoutHome() {


// Axios 
  useEffect(() => {


    const api = async () => {

      const apiPoke = await axios.get(`${URL_POKEMON}`)
      console.log(apiPoke.data);
    }


    api()

  }, [])


  return (
    <div className={css.layout} >
      <Header/>
    </div>
  )
}
