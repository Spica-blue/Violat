// Login.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { NavLink} from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    id: '',
    password: '',
  });

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = 'http://127.0.0.1:8000/login';

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error("not correct", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL, values)
      .then(response => {
        console.log('로그인 성공:', response.data);
        <NavLink className={styles.gomain} to="/" title='main' />
      })
      .catch(error => {
        console.error('로그인 실패:', error);
        setError('로그인 실패. 다시 시도해주세요.');
      });
  };

  return (
    <div className={styles.APP}>
      <div className={styles.body}>
        <div className={styles.mainBox}>
          <div className={styles.h2}>로그인</div> <br/>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="id" />
              <input
                type="text"
                id="id"
                name="id"
                placeholder="아이디를 입력하세요"
                value={values.id}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={values.password}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}<br/>
            <button type="submit" className={styles.button}>Log In</button><br/>
            <div className={styles.signupLink}>
              <NavLink className={styles.signupLink} to="/member/Sign_up" title='signup'>
                Sign Up
              </NavLink>
            </div>
          </form>
        </div>
        <div className={styles.userBox}>
          {data.length > 0 ? (
            <div className={styles.userData}>
              <h3>#서버에서 받은 데이터:</h3>
              {data.map((item, index) => (
                <div key={index}>
                  <p>아이디 : {item.id}</p>
                  <p>비밀번호 : {item.pwd}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>NONE</p>
          )}
        </div>
      </div>
    </div>
  );
}


export default Login;