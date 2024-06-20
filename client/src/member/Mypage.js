import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.css';

//로그아웃 상태면 Login/으로 이동
function Mypage() {
  const navigate = useNavigate();
  const API_URL = 'http://127.0.0.1:8000/api/deleteUser/';
  
  const clickedHandler = async () =>{
    try{
      console.log("들어옴")
      const response = await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        //인증 토큰을 헤더에 포함시킨다. 헤더에 Authorization필드(서버에서 클라이언트 신원 확인) 추가, Bearer는 인증유형
      });
      console.log('회원탈퇴 성공:', response.data);
      localStorage.removeItem('access_token'); //토큰 삭제
      localStorage.removeItem('refresh_token');

      alert('회원탈퇴가 되었습니다.')
      navigate('/');
    } catch(error){
      console.error("회원탈퇴 실패:", error.response ? error.response.data : error.message)
    }
  }
  
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
              --id--
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