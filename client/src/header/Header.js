// src/header/Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import user from './user.png';
import logo from './sample2.png';
import styles from './Header.module.css';
import { NavLink } from "react-router-dom";
import axios from 'axios';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const LOGOUT_URL = 'http://127.0.0.1:8000/api/logout/';
  const CHECK_LOGIN_STATUS_URL = 'http://127.0.0.1:8000/api/check_login_status/';
  const navigate = useNavigate();


  const checkLoginStatus = async () => {
    try {
      console.log("확인1")
      const response = await axios.get(CHECK_LOGIN_STATUS_URL, {
        withCredentials: true,
      });
      console.log("로그인결과:",response.data.is_logged_in);
      if (response.data.is_logged_in) {
        console.log("로그인상태");
        setIsLoggedIn(true);
        setUserId(response.data.user_id);
      } else {
        console.log("로그아웃상태");
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
      await axios.post(LOGOUT_URL, {
        withCredentials: true,
      });
      alert("로그아웃 성공");
      setIsLoggedIn(false); //로그인 상태 false로 변환
      setUserId(null);
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
  
    

  return (
    <div className={styles.header}>
      <div className={styles.main} onClick={handleClickMain}>
        <div className='img2' onClick={handleClickLogin}>
          <img src={logo} className={styles.logoImg} alt='logo' />
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.row}>거래소</div>
        <div className={styles.row}>입출금</div>
        <div className={styles.row}>
          <NavLink className={styles.investment} to="../asset/Balance" title='투자내역'>
            투자내역
          </NavLink>
        </div>
        <div className={styles.row}>코인동향</div>
        <div className={styles.row}>스테이킹</div>
        <div className={styles.row}>NFT</div>
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