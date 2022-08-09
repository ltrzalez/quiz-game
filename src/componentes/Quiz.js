import { useState } from 'react'
import preguntasConRespuestas from '../data.json'

function Quiz () {

  const [puntaje, setiarPuntaje] = useState(0)
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [explicacion, setExplicacion ] = useState(false)

  function proximoTurno () {
    let proximaPreguntaIndex = preguntaActual + 1    
    setPreguntaActual(proximaPreguntaIndex)
  }

  function comprobarFinDeJuego() {
    let totalLength = preguntasConRespuestas.length
    if( preguntaActual + 1 !== totalLength) {
      return false
    } else {
      setMostrarResultado(true)
      manejarExplicacion()
      return true
    }
  }

  function procesarRespuesta  (esCorrecta) {
    esCorrecta && setiarPuntaje(puntaje + 1)
    return esCorrecta
  }

  function manejarExplicacion ( ) {
    setExplicacion(!explicacion)
  }

  function manejarRespuesta (userInput) {
    procesarRespuesta(userInput)
    if (comprobarFinDeJuego()) {
      return
    }      
    userInput ? manejarExplicacion() : proximoTurno()    
  }
  
  return (
      <div >
        { mostrarResultado
          ? (<div className='score-section'>
              tu puntaje fue {puntaje} de {preguntasConRespuestas.length} preguntas
              <button onClick={_ => {setPreguntaActual(0);setiarPuntaje(0);setMostrarResultado(false);manejarExplicacion()}}>Volver a jugar</button>
            </div>)
          : 
          (
            explicacion
              ? (<div>{preguntasConRespuestas[preguntaActual].explicacion}
                  <button onClick={() => {manejarExplicacion(); proximoTurno()}}>Proxima pregunta</button>
                </div>)
              :
                (
                  <>
                    <div className='question-section'>
                      <div className='question-count'>
                        <span>Pregunta: {preguntaActual + 1}</span>/{preguntasConRespuestas.length}
                      </div>
                      <div className='question-text'>{preguntasConRespuestas[preguntaActual].pregunta}</div>
                    </div>
                    <div className='answer-section'>
                      {preguntasConRespuestas[preguntaActual].respuestas.map((respuesta, index) => (
                        <button key={index} onClick={() => manejarRespuesta(respuesta.esCorrecta)}>{respuesta.texto}</button>
                      ))}
                    </div>
                  </>
                )
          )
        }
      </div>
    );
}

export default Quiz
