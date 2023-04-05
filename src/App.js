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

  // const possibilities = [
  //                        {1.1, 1.2, 1.3},
  //                        {2.1, 2.2, 2.3},
  //                        {3.1, 3.2, 3.3},
  //                        {1.1, 2.1, 3.1},
  //                        {1.2, 2.2, 3.2},
  //                        {1.3, 2.3, 3.3},
  //                        {1.1, 2.2, 3.3},
  //                        {1.3, 2.2, 3.1},
  //                       ]

  function handleClick(key) {
    if (data[key].value !== '') {
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
  }, [player])

  return (
    <div className="main">
      <div className="frame">
        <div className="table">
          {data.map((item, key) => (
            <button
              key={item.id}
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
      </div>
      <button
        className="reset"
        onClick={() => {
          setData(initialValue)
          setDraw(false)
          setPlayer(true)
        }}
      >
        Reiniciar Jogo
      </button>
    </div>
  )
}

export default App
