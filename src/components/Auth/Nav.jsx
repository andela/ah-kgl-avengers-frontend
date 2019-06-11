import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/ah_logo_A1_Rectangle_54_pattern.png';

export default function Title() {
  return (
    <nav className="nav">
      <Link to="/" class="nav-logo left">
        <img
          src={Logo}
          alt=""
          srcSet=""
        />
        <img
          src=""
          alt=""
          srcSet=""
        />
      </Link>
    </nav>
  );
}
