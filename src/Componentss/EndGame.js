import React from 'react'

export default function EndGame(props) {
  return (
    <div>
        <h4>{props.winner === props.user1 || props.winner === props.user2 ? `You win ${props.winner} !!`:'Draw'}</h4>
        <button className='btn btn-primary' onClick={props.handleReset}>Wanna try again?</button>
    </div>
  )
}
