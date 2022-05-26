import React from 'react'
import './navbar.css'

function Navbar(props) {
  return (
    <nav className="navbar navbar-light bg-light">
        <a>Tic Tac Toe</a>
        <a>{props.user1} : {props.win1}</a>
        <a>{props.user2} : {props.win2}</a>
        <a>Tries {props.tries}:</a>
        <a></a>
        <a></a>
    </nav>
  )
}

export default Navbar
