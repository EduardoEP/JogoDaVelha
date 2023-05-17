import { useState, useEffect } from 'react'
import './App.css'
import ConfettiGenerator from 'confetti-js'

function App() {
  const initialValue = [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
  ]
  const [data, setData] = useState(initialValue)
  const [draw, setDraw] = useState(false)
  const [player, setPlayer] = useState(true)
  const [winner, setWinner] = useState('')
  const [winsPlayer1, setWinsPlayer1] = useState(0)
  const [winsPlayer2, setWinsPlayer2] = useState(0)

  const possibilities = [
    // horizontais
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // verticais
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonais
    [0, 4, 8],
    [2, 4, 6],
  ]

  useEffect(() => {
    if (winner !== '') {
      const confettiSettings = { target: 'my-canvas' }
      confettiSettings.rotate = 'true'
      confettiSettings.start_from_edge = 'true'
      confettiSettings.clock = '35'
      const confetti = new ConfettiGenerator(confettiSettings)
      confetti.render()

      return () => confetti.clear()
    }
  }, [winner])

  function handleClick(key) {
    if (data[key].value !== '' || winner !== '' || draw) {
      return
    }

    setData((tempData) => {
      if (tempData[key].value === '') {
        tempData[key].value = player ? '❌' : '⭕'
      }
      return tempData
    })

    setPlayer(!player)
  }

  useEffect(() => {
    if (data.every((item) => item.value !== '')) {
      setDraw(true)
    }

    let newWinner = ''
    for (let value of possibilities) {
      if (
        data[value[0]].value === '❌' &&
        data[value[1]].value === '❌' &&
        data[value[2]].value === '❌'
      ) {
        newWinner = 'Player1'
        setWinsPlayer1(winsPlayer1 + 1)
      }
      if (
        data[value[0]].value === '⭕' &&
        data[value[1]].value === '⭕' &&
        data[value[2]].value === '⭕'
      ) {
        newWinner = 'Player2'
        setWinsPlayer2(winsPlayer2 + 1)
      }
    }
    setWinner(newWinner)
  }, [player])

  return (
    <div className="main">
      <canvas id="my-canvas"></canvas>
      <div className="players">
        <div className={`player ${player ? 'active' : ''}`}>
          {' '}
          player1
          <span className="playerWins">{winsPlayer1}</span>
        </div>
        <div className={`player ${!player ? 'active' : ''}`}>
          player2
          <span className="playerWins">{winsPlayer2}</span>
        </div>
      </div>

      <div className="content">
        <div className="frame">
          <div className="table">
            {data.map((item, key) => (
              <button
                key={key}
                className="cell"
                onClick={() => handleClick(key)}
              >
                {item.value}
              </button>
            ))}
          </div>
          {draw ? (
            <div className="popUp">
              <p>O jogo empatou</p>
            </div>
          ) : null}
          {winner !== '' ? (
            <div className="popUp">
              <p>🎊🎊🎊🎊🎊🎊</p>
              <p>{winner} é o vencedor!!</p>
            </div>
          ) : null}
        </div>

        <div className="reset">
          {winner !== '' || draw ? (
            <button
              className="reset"
              onClick={() => {
                setData(initialValue)
                setDraw(false)
                setPlayer(true)
                setWinner('')
              }}
            >
              Reiniciar Jogo
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default App
