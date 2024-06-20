// import React, { useEffect } from 'react';
import styles from './Mainpage.module.css';

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
          <div className={styles.h3}>
          주식 모의투자 사이트에 오신 것을 환영합니다!

우리 사이트는 주식 투자의 기초를 익히고 실전 감각을 키울 수 있는 완벽한 가상 환경을 제공합니다. 다음과 같은 다양한 기능을 통해 여러분의 투자 경험을 더욱 풍부하게 만들어 드립니다:

가상 자산: 실제 돈을 투자하기 전에 가상 자산을 이용해 안전하게 투자 전략을 연습해보세요.
매수 및 매도 기능: 다양한 종목을 실시간으로 매수하고 매도하며 투자 기술을 연마할 수 있습니다.
실시간 주식 차트: 최신 주식 시장 데이터를 반영한 실시간 차트를 통해 시장의 움직임을 빠르게 파악하고, 정확한 투자 결정을 내릴 수 있습니다.
지금 바로 가입하여 주식 투자의 세계로 첫 발을 내딛어 보세요!
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainpage;