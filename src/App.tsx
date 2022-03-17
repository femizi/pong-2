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
      
      <Canvas gameStart={gameStart} gameStarter={gameStarter}/>
    </div>
  )
}

export default App
