import React, { useState,useEffect } from 'react'
import './login.css';
import Game from './Game';


function Login(props) {

  const [login, setLogin] = useState('block')
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  let click = "//daveceddia.com/freebies/react-metronome/click1.wav";
  click = new Audio(click)
    
    

  const onSubmit = () => {


    if(name2 ==='' || name1 === '') {
      return click.play();  
    }else{
      setLogin('none');
    }

    
  }
  return (
    <div>
      {login === 'block'?'':<Game user1={name1} user2={name2} />}
        <div className='row'>
          <center style={{display:login}}>
            <h1>Tic Tac Toe</h1>
            <div style={{backgroundColor:'cadetblue', width:'40%'}}>
              <form style={{padding:'30px', marginLeft:'0'}}>
                <input type='text' id='player1' onChange={(e) => setName1(e.target.value)} placeholder='Please insert your name' /><br /> <br />
                <input type='text' id='player2' onChange={(e) => setName2(e.target.value)} placeholder='Please insert your name' /><br /> <br />
                <button type='button' className='startBtn' onClick={onSubmit}>Start</button>
              </form>
            </div>
          </center>
        </div>
        
    </div>
  )
}

export default Login
