// src/header/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from './user.png';
import styles from './Header.module.css';
import { NavLink} from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate('/Login');
  };

  const handleClickMain = () => {
    navigate('/')
  }

  return (
    <div className={styles.header}>
      <div className={styles.main} onClick={handleClickMain}>
        <div className={styles.h1}>head</div>
      </div>
      <div className={styles.list}>
        <div className={styles.row}>거래소</div>
        <div className={styles.row}>입출금</div>
        <div className={styles.row}>
          <NavLink className={styles.investment} to="../asset/balance" title='투자내역'>
            투자내역
          </NavLink>
        </div>
        <div className={styles.row}>
          <NavLink className={styles.investment} to="../asset/rankings" title='순위'>
            주식순위
          </NavLink>
        </div>
        <div className={styles.row}>
          <NavLink className={styles.investment} to="../asset/buy" title='트레이드'>
            트레이드
          </NavLink>
        </div>
        <div className={styles.row}>NFT</div>
        <div className={styles.row}>고객센터</div>
      </div>
      <div className={styles.img} onClick={handleClickLogin}>
        <img src={user} className={styles.userImg} alt='User' />
      </div>
    </div>
  );
}

export default Header;
