import React, { useState } from 'react';
import styles from './SignUp.module.css';

function SignUp() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isIdCheck, setIsIdCheck] = useState(false); 
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onChangeIdHandler = (e) => {
    const idValue = e.target.value;
    setId(idValue);
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
    const idRegex = /^[a-z\d]{5,10}$/;
    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      setIsIdAvailable(false);
      return false;
    } else if (!idRegex.test(id)) {
      setIdError('아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
      setIsIdAvailable(false);
      return false;
    }
    try {
      const responseData = await idDuplicateCheck(id); 
      if (responseData) {
        setIdError('사용 가능한 아이디입니다.');
        setIsIdCheck(true);
        setIsIdAvailable(true);
        return true;
      } else {
        setIdError('이미 사용중인 아이디입니다.');
        setIsIdAvailable(false);
        return false;
      }
    } catch (error) {
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
    if (idCheckResult) setIdError('');
    else return;
    if (!isIdCheck || !isIdAvailable) {
      alert('아이디 중복 검사를 해주세요.');
      return;
    }

    const passwordCheckResult = passwordCheckHandler(password, confirm);
    if (passwordCheckResult) { setPasswordError(''); setConfirmError(''); }
    else return;

    try {
      const responseData = await signup(id, password, confirm); 
      if (responseData) {
        localStorage.setItem('loginId', id);
        setOpenModal(true);
      } else {
        alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      console.error(error);
    }
  }

  return (
    <>
      <div className={styles.header}>회원가입</div>
      <div className={styles.wrapper}>
        <form onSubmit={signupHandler} className={styles.form}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
              <label htmlFor='id'>아이디</label>
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
              <label htmlFor='password'>비밀번호</label>
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
        {openModal && <div className={styles.modal}>회원가입이 완료되었습니다!</div>}
      </div>
    </>
  );
}

async function idDuplicateCheck(id) {
  // 여기서 서버에 ID 중복 체크 요청을 보내야 합니다.
  // 이 예제에서는 항상 false를 반환하도록 하겠습니다.
  return false;
}

async function signup(id, password, confirm) {
  // 여기서 서버에 회원가입 요청을 보내야 합니다.
  // 이 예제에서는 항상 true를 반환하도록 하겠습니다.
  return true;
}

export default SignUp;
