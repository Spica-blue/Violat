// import React, { useEffect } from 'react';
import styles from './Mainpage.module.css';
import img from './main.png';

function Mainpage() {
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);
  
  return (
    <>
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.h1}>VIOLAT</div>
          <div>
          </div>
        </div>
        <div className={styles.box1}>
          <div className={styles.coment}>
            <div className={styles.h3}>
            주식 모의투자 사이트
            </div><br/><br/>
            <div className={styles.h5}>
              가상의 자산을 운용하여 실전 감각을 키울 수 있는 완벽한 가상 환경을 제공합니다.
            </div> <br/>
            <div className={styles.h6}>
            가상 자산<br/>
            매수 및 매도 기능<br/>
            실시간 주식 차트<br/>
            </div>
          </div>
          <div>
            <img src={img}  className={styles.img} alt='img'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainpage;