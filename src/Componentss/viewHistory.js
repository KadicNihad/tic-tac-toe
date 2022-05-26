import React from 'react'

export default function ViewHistory({history}) {

    
  return history.map(histori => (
      <tr>
          <td key={histori.id}>{histori.id}</td>
          <td>{histori.time}</td>
          <td>{histori.user1} vs {histori.user2}</td>
          <td>{histori.winner === histori.user1 || histori.winner === histori.user2 ? `${histori.winner} won `:'Draw'}</td>
      </tr>
  ))
  
}
