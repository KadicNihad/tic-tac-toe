import React, {  useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import EndGame from './EndGame'
import './Game.css'
import Navbar from './navbar'
import ViewHistory from './viewHistory'


const getDataFromLS = () => {
  let data = localStorage.getItem('history')
  if(data) {
    return JSON.parse(data)
  }else {
    return []
  }
}

export default function Game({user1,user2}) {
  const [turn, setTurn] = useState('X')
  const [cells, setCells] = useState(Array(9).fill(''))
  const [winner, setWinner] = useState('')
  const [disable, setDisable] = useState(false)
  const [count, setCount] = useState(0);
  const [win1,setWin1] = useState(0)
  const [win2,setWin2] = useState(0)
  const [draw,setDraw] = useState(0)
  const [display,setDisplay] = useState('none')
  const [history, setHistory] = useState(getDataFromLS())
  const [time,setTime] = useState('')
  let click = "//daveceddia.com/freebies/react-metronome/click1.wav";
  click = new Audio(click)
    


const checkForWinner = (squares) => {

  const combos = {
    down: [
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ],
    horizontal:
    [
      [0,1,2],
      [3,4,5],
      [6,7,8]
    ],
    diagonal: [
      [0,4,8],
      [2,4,6]
    ]  
  }

    for(let combo in combos) {
      combos[combo].forEach((pattern) => {
          if(squares[pattern[0]] === '' || squares[pattern[1]]=== '' || squares[pattern[2]]=== '') {
              //do nothing     
              setTime(new Date().toLocaleString())
                            
          }else if(squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]) {
            setDisplay('block')
            let histori = {
              id:history.length +1,
              user1,
              user2,
              winner:turn ==='X'?user1:user2,
              time
            }
            setHistory([...history,histori])
            
            if(turn === 'X') {
              setWinner( user1)
              setWin1(win1 +1)
            }else {
              setWinner(user2)
              setWin2(win2 +1)
            }
              setDisable(true)
          } else if(count === 8) {
            if(squares[pattern[0]] !== squares[pattern[1]] || squares[pattern[1]] !== squares[pattern[2]]) {
            setDisable(true)
            setDisplay('block')
            setDraw(draw +1)
            
            let histori = {
              id:history.length+1,
              user1,
              user2,
              winner,
              time
            }
            setHistory([...history,histori])
            }
          }
      })
      
  }
}


useEffect(() => {
  localStorage.setItem('history',JSON.stringify(history))
},[history])

  const handleClick = (num) => {

    setCount(count + 1)
    
    if(cells[num] !== '') {
      return click.play();
    }

    const squares = [...cells]
    if(turn === 'X') {
        squares[num]='X'
        setTurn('O')
    }else {
      squares[num]='O'
      setTurn('X')
    }
    checkForWinner(squares)
    setCells(squares)
  }

  const Cell = ({num}) => {
    return <td> <button className='sqauresBtn' onClick={() => handleClick(num)} disabled={disable}>{cells[num]}</button></td>
  }

  const handleReset = () => {
    setCells(Array(9).fill(''));
    setWinner('')
    setDisable(false)
    setCount(0)
    setDisplay('none')
    
  }

  return (
    <div className='containerGreet'>
      <div className='row'>
        <Navbar user1 = {user1} user2 = {user2} win1={win1} win2={win2} tries= {win1+win2+draw}/>
      </div>
      <div className='row'>
        <div className='col-md-4'>
         <h3 className='text-center'>History of results</h3>
          <center>
            <table className='text-center' style={{width:'60%', fontSize:'13px',display:history.length ===0 ? 'none':'block'}}>
                <thead>
                  <th>ID</th>
                  <th>Time & Date</th>
                  <th>Players</th>
                  <th>Winner</th>
                </thead>
                <tbody>
                  <ViewHistory history={history} />
                </tbody>
            </table>
          </center>
        </div>
        <div className='col-md-8'>
          <div style={{display:display}}>
            <EndGame winner={winner} user1={user1} user2={user2}  handleReset={handleReset}/>
          </div>
          <table className='table' style={{display:display==='block'?'none':'block'}}>
            <tbody>
              It's {turn ==='X'?user1:user2} Turn
              <tr disabled={true}>
                <Cell num={0} />
                <Cell num={1} />
                <Cell num={2} />
              </tr>
              <tr>
                <Cell num={3} />
                <Cell num={4} />
                <Cell num={5} />
              </tr>
              <tr>
                <Cell num={6} />
                <Cell num={7} />
                <Cell num={8} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
