// src/member/sign_up.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';

function SignUp() {
  const [data, setData] = useState([]);

  const API_URL = "http://127.0.0.1:8000/";

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <p>아이디 : {item.id}</p>
            <p>비밀번호 : {item.pwd}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SignUp;
