import React, { useState } from 'react';
import styles from './SignUp.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isIdCheck, setIsIdCheck] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const navigate = useNavigate();
  const IDCHECK_URL = 'http://127.0.0.1:8000/api/id_check/';
  const SIGNUP_URL = 'http://127.0.0.1:8000/api/signup/';

  const onChangeIdHandler = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    console.log("id:",idValue)
    idCheckHandler(idValue);
  }

  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
      passwordCheckHandler(value, confirm);
    } else {
      setConfirm(value);
      passwordCheckHandler(password, value);
    }
  }

  const idCheckHandler = async (id) => {
    const idRegex = /^[a-z\d!@*&-_]{5,16}$/;
    console.log("id체크:",idRegex.test(id));
    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      setIsIdAvailable(false);
      return false;
    }
    try {
      console.log("들어옴")
      const response = await axios.post(IDCHECK_URL, { id });
      console.log("response:",response.data.exists)
      if (response.data.exists) {
        setIdError('이미 사용중인 아이디입니다.');
        setIsIdCheck(false);
        setIsIdAvailable(false);
        return false;
      } else {
        console.log("확인:",idRegex.test(id))
        if (!idRegex.test(id)){
          setIdError('아이디는 5~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
          setIsIdCheck(false);
          setIsIdAvailable(false);
          return false;
        }
        else if(idRegex.test(id)){
          setIdError('사용 가능한 아이디입니다.');
          setIsIdCheck(true);
          setIsIdAvailable(true);
          return true;
        }
      }
    } catch (error) {
      console.log("fail")
      alert('서버 오류입니다. 관리자에게 문의하세요.');
      console.error(error);
      return false;
    }
  }

  const passwordCheckHandler = (password, confirm) => {
    const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
      return false;
    } else if (confirm !== password) {
      setPasswordError('');
      setConfirmError('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      setPasswordError('');
      setConfirmError('');
      return true;
    }
  }

  const signupHandler = async (e) => {
    e.preventDefault();

    const idCheckResult = await idCheckHandler(id);
    if (!idCheckResult) {
      alert('아이디 중복 검사를 해주세요.');
      return;
    }

    const passwordCheckResult = passwordCheckHandler(password, confirm);
    if (!passwordCheckResult) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    

    try {
      const signupResponse = await axios.post('http://127.0.0.1:8000/member/signup/', { id, password }, {
        withCredentials: true,
      });
      if (signupResponse.data.success) {
        // 회원가입 성공 후 자동 로그인 처리
        try {
          const loginResponse = await axios.post('http://127.0.0.1:8000/member/login/', { username: id, password }, {
            withCredentials: true,
          });
          if (loginResponse.status === 200) {
            alert('회원가입이 완료되었습니다');
            navigate('/member/login');
          } else {
            alert('회원가입에 실패하였습니다. 다시 시도해주세요.1');
            console.log("실패1");
          }
        } catch (error) {
          alert('회원가입에 실패하였습니다. 다시 시도해주세요.2');
          console.log("실패2");
          console.error(error);
        }
      } else{
        alert(signupResponse.data.message || '회원가입 실패2.5')
      }
    } catch(error){
      alert('회원가입 실패3');
      console.log("실패3");
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={signupHandler} className={styles.form}>
          <div className={styles.h2}>회원가입</div> <br/>
          <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
              <input
                onChange={onChangeIdHandler}
                type="text"
                id='id'
                name='id'
                value={id}
                placeholder='아이디 입력'
                className={styles.input}
                maxLength={10}
              />
              {idError && <small className={isIdAvailable ? styles.idAvailable : styles.error}>{idError}</small>}
            </div>
            <div className={styles.inputContainer}>
              <input
                onChange={onChangePasswordHandler}
                type="password"
                id='password'
                name='password'
                value={password}
                placeholder='비밀번호 입력'
                className={styles.input}
                maxLength={16}
              />
              {passwordError && <small className={styles.error}>{passwordError}</small>}
              <input
                onChange={onChangePasswordHandler}
                type="password"
                id='confirm'
                name='confirm'
                value={confirm}
                placeholder='비밀번호 확인'
                className={styles.input}
                maxLength={16}
              />
              {confirmError && <small className={styles.error}>{confirmError}</small>}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type='submit' className={styles.button}>Sign Up</button>
          </div>
        </form>
        {/* {openModal && <div className={styles.modal}>회원가입 완료</div>} */}
      </div>
    </>
  );
}

export default SignUp;
