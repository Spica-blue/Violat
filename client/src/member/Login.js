import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    id: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = 'http://127.0.0.1:8000/api/login/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("값:",values)
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, values);
      console.log('로그인 성공:', response.data);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      alert("로그인 성공");

      setValues({ id: '', password: '' }); //리디렉트
      setError(null);

      navigate('/'); // 로그인 성공 시 메인 페이지로 이동

      window.location.reload();
    } catch (error) {
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
      setError('로그인 실패. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.APP}>
      <div className={styles.body}>
        <div className={styles.mainBox}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="id">아이디:</label>
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
                <label htmlFor="password">비밀번호:</label>
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
                <NavLink className={styles.signupLink} to="/member/SignUp" title='signup'>
                  Sign Up
                </NavLink>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Login;













// // Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './Login.module.css';
// import { NavLink, useNavigate } from 'react-router-dom';

// function Login() {
//   const [values, setValues] = useState({
//     id: '',
//     password: '',
//   });

//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const API_URL = 'http://127.0.0.1:8000/api/login/';

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(API_URL, values, { withCredentials: true });
//       console.log('로그인 성공:', response.data);
//       alert("로그인 성공");
//       navigate('/'); // 로그인 성공 시 메인 페이지로 이동
//     } catch (error) {
//       console.error('로그인 실패:', error.response ? error.response.data : error.message);
//       if (error.response) {
//         setError('로그인 실패. 다시 시도해주세요.');
//       } else {
//         setError('서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.');
//       }
//     }
//   };


//   return (
//     <div className={styles.APP}>
//       <div className={styles.body}>
//         <div className={styles.mainBox}>
//             <form onSubmit={handleSubmit} className={styles.form}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="id">아이디:</label>
//                 <input
//                   type="text"
//                   id="id"
//                   name="id"
//                   placeholder="아이디를 입력하세요"
//                   value={values.id}
//                   onChange={handleChange}
//                   className={styles.input}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="password">비밀번호:</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="비밀번호를 입력하세요"
//                   value={values.password}
//                   onChange={handleChange}
//                   className={styles.input}
//                   required
//                 />
//               </div>
//               {error && <p className={styles.error}>{error}</p>}<br/>
//               <button type="submit" className={styles.button}>Log In</button><br/>
//               <div className={styles.signupLink}>
//                 <NavLink className={styles.signupLink} to="/member/SignUp" title='signup'>
//                   Sign Up
//                 </NavLink>
//               </div>
//             </form>
//         </div>
//         {/* {isLoggedIn && (
//           <div className={styles.userBox}>
//             <h3>로그인 상태</h3>
//             <p>사용자 ID: {userId}</p>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }

// export default Login;








// //로그인 상태 확인 전 return
// // return (
// //   <div className={styles.APP}>
// //     <div className={styles.body}>
// //       <div className={styles.mainBox}>
// //         <div className={styles.h2}>로그인</div> <br/>
// //         <form onSubmit={handleSubmit} className={styles.form}>
// //           <div className={styles.formGroup}>
// //             <label htmlFor="id">아이디:</label>
// //             <input
// //               type="text"
// //               id="id"
// //               name="id"
// //               placeholder="아이디를 입력하세요"
// //               value={values.id}
// //               onChange={handleChange}
// //               className={styles.input}
// //               required
// //             />
// //           </div>
// //           <div className={styles.formGroup}>
// //             <label htmlFor="password">비밀번호:</label>
// //             <input
// //               type="password"
// //               id="password"
// //               name="password"
// //               placeholder="비밀번호를 입력하세요"
// //               value={values.password}
// //               onChange={handleChange}
// //               className={styles.input}
// //               required
// //             />
// //           </div>
// //           {error && <p className={styles.error}>{error}</p>}<br/>
// //           <button type="submit" className={styles.button}>Log In</button><br/>
// //           <div className={styles.signupLink}>
// //             <NavLink className={styles.signupLink} to="/member/SignUp" title='signup'>
// //               Sign Up
// //             </NavLink>
// //           </div>
// //         </form>
// //         <button onClick={handleLogout} className={styles.button}>Log Out</button>
// //       </div>
// //     </div>
// //   </div>
// // );
