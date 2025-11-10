import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/FooterSub.module.css';
import Footer from './Footer';

function FooterSub() {
  const location = useLocation();
  const [output, setOutput] = useState(''); 

  useEffect(() => {
    const { id } = location.state || {};
    switch (id) {
      case 1:
        setOutput(
          <div className={styles.list}>
            최용규<br/>
            허은진<br/>
            이승우
          </div>
        );
        break;
      case 2:
        setOutput(
          <div className={styles.list}>
            환영합니다. 주식모의투자사이트 VIOLAT입니다
          </div>
        );
        break;
      case 3:
        setOutput(
          <div className={styles.list}>
            거래이용안내
          </div>
        );
        break;
      case 4:
        setOutput(
          <div className={styles.list}>
            입출금 이용 안내
          </div>
        );
        break;
      default:
        setOutput('None');
    }
  }, [location.state]);

  return (
    <div className={styles.body}>
      <div>{output}</div>
    </div>
  );
}

export default FooterSub;
