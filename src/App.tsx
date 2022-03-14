import Canvas from './Canvas'

import './App.css'
import { useState } from 'react'

function App() {
 const [gameStart, setGameStart] = useState(false)
 function gameStarter (){
   setGameStart(true)
 }

  return (
    <div className="App">
      {gameStart?"": <div className='instructions'><button onClick={()=> gameStarter()}>Start Game</button></div>}
      <Canvas gameStart={gameStart}/>
    </div>
  )
}

export default App
