import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import user from './user.png';
import './Mainpage.css';

function Mainpage() {

  const navigate =useNavigate();

  const handleClick = () =>{
    navigate('/login')
  }

  return (
    <div className='body'>
      <div className='title'>
        <h1>VIOLAT</h1>
      </div>

      <div className='img' onClick={()=>handleClick()}>
          <img src={user} className="user-img" alt='User'/>
      </div>
      
      <div className='box1'>
      flkjadlsjfldfj
      </div>
    </div>
    
  );
}

export default Mainpage;