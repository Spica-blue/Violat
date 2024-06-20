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
          <div className={styles.h3}>
          주식 모의투자 사이트에 오신 것을 환영합니다!

우리 사이트는 주식 투자의 기초를 익히고 실전 감각을 키울 수 있는 완벽한 가상 환경을 제공합니다. 다음과 같은 다양한 기능을 통해 여러분의 투자 경험을 더욱 풍부하게 만들어 드립니다:

가상 자산: 실제 돈을 투자하기 전에 가상 자산을 이용해 안전하게 투자 전략을 연습해보세요.
매수 및 매도 기능: 다양한 종목을 실시간으로 매수하고 매도하며 투자 기술을 연마할 수 있습니다.
실시간 주식 차트: 최신 주식 시장 데이터를 반영한 실시간 차트를 통해 시장의 움직임을 빠르게 파악하고, 정확한 투자 결정을 내릴 수 있습니다.
지금 바로 가입하여 주식 투자의 세계로 첫 발을 내딛어 보세요!
          </div>
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