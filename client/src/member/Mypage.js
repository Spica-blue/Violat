import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.css';

function Mypage() {
  const navigate = useNavigate();
  const DELETE_URL = 'http://127.0.0.1:8000/api/deleteUser/';
  const [userId, setUserId] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  const handleRefresh = () =>{
    window.location.reload();
  };

  

  const clickedHandler = async () =>{
    try{
      console.log("들어옴");

      const response = await axios.delete(DELETE_URL, {
        data: { user_id: userId }
      });
      console.log("탈퇴: ", response.data);
      window.sessionStorage.clear();
      alert('회원탈퇴가 되었습니다.');
      setUserId(null);
      navigate('/');
      handleRefresh();
    } catch(error){
      console.error("회원탈퇴 실패:", error.response ? error.response.data : error.message)
    }
  };

  const checkLoginStatus = async () => {
    try {
      console.log("마이페이지1테스트")
      const sessionId = window.sessionStorage.getItem("sessionid");
      console.log("세션값:",sessionId)
      const sessionAccount = localStorage.getItem("loginAccount");
      console.log("세션값2:",sessionAccount)
      if (sessionId) {
        setUserId(sessionId);
        setAccount(sessionAccount);
        console.log("마이페이지account확인",sessionAccount)
      } 
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
    }
  };
  
  return(
    <>
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.h1}>Mypage</div>
        </div>
        <div className={styles.box1}>
          <div className={styles.userid}>
            <div className={styles.h3}>사용자 ID</div>
            <div className={styles.id}>
              {userId}
            </div>
            <div className={styles.h3}>사용자 계좌번호</div>
            <div className={styles.account}>
              {account}
            </div>
          </div>
          <div className={styles.hr}/>
          <div className={styles.dropout}>
            <div className={styles.h3}>회원탈퇴</div>
            <button onClick={clickedHandler} className={styles.button}>member leave</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypage;