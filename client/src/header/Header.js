// src/header/Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import user from './user.png';
import logo from './sample2.png';
import styles from './Header.module.css';
import { NavLink } from "react-router-dom";
// import axios from 'axios';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  // const LOGOUT_URL = 'http://127.0.0.1:8000/api/logout/';
  // const CHECK_LOGIN_STATUS_URL = 'http://127.0.0.1:8000/api/check_login_status/';
  const navigate = useNavigate();
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const sessionId = window.sessionStorage.getItem("sessionid");
      if (sessionId) {
          setIsLoggedIn(true);
          setUserId(sessionId);
      } 
      else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      window.sessionStorage.clear();
      alert("로그아웃 성공");
      setIsLoggedIn(false); //로그인 상태 false로 변환
      navigate('/member/Login');
    } catch (error) {
      console.error('로그아웃 실패:', error.response ? error.response.data : error.message);
    }
  };

  const handleClickLogin = () => {
    navigate('/member/Login');
  };

  const handleClickMain = () => {
    navigate('/');
  };

  const handleClickMypage = () => 
    {isLoggedIn ? (
      navigate('/member/Mypage')
    ) : (
      navigate('/member/Login')
    )}
  
  const handleClickBalance = () => {
    if (isLoggedIn) {
      navigate('/asset/balance');
    } else {
      alert("로그인시 이용가능합니다.");
      navigate('/member/Login');
    }
  }

  const handleClickAccount = () => {
    if (isLoggedIn) {
      navigate('/member/Account');
    } else {
      alert("로그인시 이용가능합니다.");
      navigate('/member/Login');
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.main} onClick={handleClickMain}>
        <div className='img2' onClick={handleClickLogin}>
          <img src={logo} className={styles.logoImg} alt='logo' />
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.row}>
          <div onClick={handleClickAccount} className={styles.investment} title='가상계좌개설'>
            가상계좌개설
          </div>
        </div>
        <div className={styles.row}>
          <div onClick={handleClickBalance} className={styles.investment} title='투자내역'>
            투자내역
          </div>
        </div>
        <div className={styles.row}>
          <NavLink className={styles.investment} to="../asset/rankings" title='순위'>
            주식순위
          </NavLink>
        </div>
        <div className={styles.row}>
          <NavLink className={styles.investment} to="/trade/stock/삼성전자" title='트레이드'>
            트레이드
          </NavLink>
        </div>
        <div className={styles.row}>
          <div onClick={handleClickMypage} className={styles.investment}>
            마이페이지
          </div>
        </div>
      </div>
      
      <div className={styles.userSection}>
        {isLoggedIn ? (
          <div className={styles.user}>
            <button onClick={handleLogout} className={styles.button}>Log Out</button>
            <div className={styles.stateLogin}>
              <p>{userId}</p>
            </div>
          </div>
        ) : (
          <div className='img' onClick={handleClickLogin}>
            <img src={user} className={styles.userImg} alt='User' />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;