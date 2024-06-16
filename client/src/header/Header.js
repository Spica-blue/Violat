// src/header/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from './user.png';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate('/Login');
  };

  const handleClickMain = () => {
    navigate('/')
  }

  return (
    <div className='header'>
      <div className='main' onClick={handleClickMain}>
        <h1>head</h1>
      </div>
      <div className='list'>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <div className='img' onClick={handleClickLogin}>
        <img src={user} className="user-img" alt='User' />
      </div>
    </div>
  );
}

export default Header;
