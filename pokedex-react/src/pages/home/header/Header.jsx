import React from 'react'
import * as FaIcons from "react-icons/fa";
import css from './header.module.scss'
import logo from '../../../assets/Pokemon.png'

// fonction obtenirSearch = props 
export default function Header({ obtenirSearch }) {
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={css.div_search}>
          <div>
            <FaIcons.FaSearch />
          </div>
          <input
            type="search"
            onChange={(e) => obtenirSearch(e.target.value)} // Appel de obtenirSearch lors de la saisie
          />
        </div>
      </div>
    </nav>
  );
}
