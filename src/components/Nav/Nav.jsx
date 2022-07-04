import React from "react";
import {Link} from 'react-router-dom';

const Nav = () => {
  return <nav className="hamburger-menu">
          <input id="menu__toggle" type="checkbox" />
          <label className="menu__btn" for="menu__toggle">
            <span></span>
          </label>
          <ul className="menu__box">
            <li><Link className="menu__item" to='/'>Home</Link></li>
            <li><Link className="menu__item" to='/articles'>Articles</Link></li>
            <li><Link className="menu__item" to='/products'>Products</Link></li>
          </ul> 
        </nav>;
};

export default Nav;
