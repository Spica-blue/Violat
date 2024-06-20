// import React, { useEffect, useState } from 'react';
import React from 'react';
// import axios from 'axios';
import styles from './Mainpage.module.css';
import { useNavigate } from 'react-router-dom';

function Mainpage() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setUserId] = useState(null);
  // const navigate = useNavigate();
  // const LOGOUT_URL = 'http://127.0.0.1:8000/api/logout/';
  // const CHECK_LOGIN_STATUS_URL = 'http://127.0.0.1:8000/api/check_login_status/';

  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

  // const checkLoginStatus = async () => {
  //   try {
  //     const token = localStorage.getItem('access_token');
  //     console.log("토큰 :",token)
  //     if (token) {
  //       const response = await axios.get(CHECK_LOGIN_STATUS_URL, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       // console.log("로그인결과:",response.data.is_logged_in)
  //       if (response.data.is_logged_in) {
  //         setIsLoggedIn(true);
  //         setUserId(response.data.user_id);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('로그인 상태 확인 실패:', error);
  //   }
  // };

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.post(LOGOUT_URL, {}, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  //     });
  //     console.log('로그아웃 성공:', response.data);
  //     localStorage.removeItem('access_token');
  //     localStorage.removeItem('refresh_token');
  //     alert("로그아웃 성공");
  //     setIsLoggedIn(false); //로그인 상태 false로 변환
  //     navigate('/member/login');
  //   } catch (error) {
  //     console.error('로그아웃 실패:', error.response ? error.response.data : error.message);
  //   }
  // };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.h1}>VIOLAT</div>
          {/* <button onClick={handleLogout} className={styles.button}>Log Out</button> */}
        </div>
        <div className={styles.box1}>
          <div className={styles.h3}>information</div>
          {/* {isLoggedIn && (
            <div>
              <h3>로그인 상태</h3>
              <p>로그인된 사용자: {userId}</p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export default Mainpage;