import React from 'react'

const Score = ({playerScore1, playerScore2}) => {
  return (
    <div className="score">
    <div id="player-score">{playerScore1}</div>
    <div id="computer-score">{playerScore2}</div>
  </div>
  )
}

export default Score