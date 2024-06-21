import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Account.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

function Account() {
  const [values, setValues] = useState({
    id: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(0);
  const API_URL = 'http://127.0.0.1:8000/api/login/';
  const sessionId = window.sessionStorage.getItem("sessionid");

  useEffect(() => {
    const prc = parseFloat(price) || 0;
  }, [price]);

  console.log("세션 확인!!!", sessionId);

  function buyStock(e) {
    e.preventDefault();

    if (!price || parseFloat(price) <= 0) {
        alert('한도 변경은 0보다 커야 합니다.');
        return;
    }

    setIsLoading(true);

    const requestBody = {
        account_num: sessionId,
        deposit: price,
        deposit_limit: price,
    };

    fetch('http://127.0.0.1:8000/asset/buyStock/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        console.log("매수 요청 성공:", data);
        alert("매수 완료되었습니다.")
        setIsLoading(false);
    })
    .catch(error => {
        console.error("매수 요청 실패:", error);
        setIsLoading(false);
    });
}

  return (
    <div className={styles.APP}>
      <div className={styles.body}>
        <div className={styles.mainBox}>
          <div className={styles.css_ilfvon}>
            <div className={styles.css_0}>가상계좌 한도<span className={styles.css_1nodk1f}>(KRW)</span></div>
            <div className={styles.css_0}>
                <div className={styles.css_ihz6y5}>
                    <div className={styles.css_xx6yfy}>
                        <input
                            type="text"
                            className={styles.css_sw8u0u}
                            placeholder='1000000'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            readOnly
                        />
                        <div>
                            <button type="button" title="-" onClick={() => setPrice(prev => Math.max(0, Number(prev) - 1000).toString())}> -
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" className={styles.css_11uuyrb}>
                                    <use href="#ic_calc_minus"></use>
                                </svg>
                            </button>
                            <button type="button" title="+" onClick={() => setPrice(prev => (Number(prev) + 1000).toString())}> +
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" className={styles.css_11uuyrb}>
                                    <use href="#ic_calc_plus"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className={styles.css_1gf7e9w}>
            <div className={styles.css_xsmrp6}>
              <button title="초기화" className={styles.css_1xupxm9} onClick={() => { setPrice('') }}>초기화</button>
              <button title="한도 변경" className={styles.css_1xupxm10} disabled={isLoading}>
                  {isLoading ? "진행중" : "한도 변경"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;