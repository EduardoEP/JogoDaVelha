import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const initialValue = [
    { id: '1.1', value: '' },
    { id: '1.2', value: '' },
    { id: '1.3', value: '' },
    { id: '2.1', value: '' },
    { id: '2.2', value: '' },
    { id: '2.3', value: '' },
    { id: '3.1', value: '' },
    { id: '3.2', value: '' },
    { id: '3.3', value: '' },
  ]
  const [data, setData] = useState(initialValue)
  const [draw, setDraw] = useState(false)
  const [player, setPlayer] = useState(true)
  const [winner, setWinner] = useState('')

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
      }
      if (
        data[value[0]].value === '⭕' &&
        data[value[1]].value === '⭕' &&
        data[value[2]].value === '⭕'
      ) {
        newWinner = 'Player2'
      }
    }
    setWinner(newWinner)
  }, [player])

  return (
    <div className="main">
      <div className="frame">
        <div className="table">
          {data.map((item, key) => (
            <button key={key} className="cell" onClick={() => handleClick(key)}>
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
            <p>{winner} é o vencedor 🎊🎊🎊</p>
          </div>
        ) : null}
      </div>

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
    </div>
  )
}

export default App
