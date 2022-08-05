import { useState } from 'react'
import preguntasConRespuestas from '../data.json'

function Quiz () {

  const [puntaje, setiarPuntaje] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [ showScore, setShowScore] = useState(false)

  function handleAnswerOptionClick  (esCorrecta) {
    esCorrecta && setiarPuntaje(puntaje + 1)
    
    let proximaPreguntaIndex = currentQuestion + 1
    let totalLength = preguntasConRespuestas.length
    console.log(proximaPreguntaIndex, totalLength    )
    console.log(proximaPreguntaIndex < totalLength, showScore  )
    proximaPreguntaIndex !== totalLength
      ? setCurrentQuestion(proximaPreguntaIndex)
      : setShowScore(true)
  }
  
  return (
      <div >          
          {/* <div>{preguntasConRespuestas[currentQuestion].explicacion 
            ? preguntasConRespuestas[currentQuestion].explicacion 
            : ''}
            </div> */}
        {showScore ? (
          <div className='score-section'>
            You scored {puntaje} out of {preguntasConRespuestas.length}
            <button onClick={_ => {setCurrentQuestion(0);setShowScore(false)}}>Volver a jugar</button>
          </div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Pregunta: {currentQuestion + 1}</span>/{preguntasConRespuestas.length}
              </div>
              <div className='question-text'>{preguntasConRespuestas[currentQuestion].pregunta}</div>
            </div>
            <div className='answer-section'>
              {preguntasConRespuestas[currentQuestion].respuestas.map((respuesta, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick(respuesta.esCorrecta)}>{respuesta.texto}</button>
              ))}
            </div>
          </>
        )}
      </div>
    );
}

export default Quiz
