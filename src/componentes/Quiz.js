import { useState, useEffect } from 'react'
import preguntasConRespuestas from '../data.json'
import libreDeDeuda from '../libre-de-deuda.png'

function Quiz () {

  const [puntaje, setiarPuntaje] = useState(0)
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [explicacion, setExplicacion ] = useState(false)
  const [esGanador, setEsGanador ] = useState(false)

  function proximoTurno () {
    let proximaPreguntaIndex = preguntaActual + 1    
    setPreguntaActual(proximaPreguntaIndex)
  }


  function comprobarFinDeJuego() {
    let totalLength = preguntasConRespuestas.length
    if( preguntaActual + 1 !== totalLength) {
      return false
    } else {      
      console.log(esGanador)
      console.log(puntaje)
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
      //corto flujo de accion
      return
    }      
    userInput ? manejarExplicacion() : proximoTurno()    
  }

  function reiniciarJuego() {
    setPreguntaActual(0);setiarPuntaje(0);setMostrarResultado(false);manejarExplicacion();setEsGanador(false)
  }

  useEffect(() => {
  
  }, [esGanador])
  

  // const GanoPerdio = () => {
  //   return (
  //     <>
  //     {esGanador
  //       ? (<div className='question-section'>
  //       tu puntaje fue {puntaje} de {preguntasConRespuestas.length} preguntas
  //       <div className='question-text'>
  //         Sos el ganador!! 
  //       </div>
  //       <img alt='no hay dibujo del fer'></img>
  //         <button onClick={_ => {reiniciarJuego()}}>Volver a jugar</button>
  //       </div>) 
  //       :(<div className='question-section'>
  //             tu puntaje fue {puntaje} de {preguntasConRespuestas.length} preguntas
  //             <div className='question-text'>
  //               ¡ Tenes que responder todas bien para ganar el premio !
  //             </div>
  //             <button onClick={_ => {reiniciarJuego()}}>Volver a jugar</button>
  //           </div>)}
  //     </>
  //   )
  // }


//   const Gano = _ => {
//     return ( 
//       <>
//         <div className='question-section'>
//           tu puntaje fue {puntaje} de {preguntasConRespuestas.length} preguntas
//           <div className='question-text'>
//   Sos el ganador!! 
// </div>
// <img alt='no hay dibujo del fer'></img>
//           <button onClick={_ => {reiniciarJuego()}}>Volver a jugar</button>
//         </div>
//       </>
//     )
//   }
  const GanooPerdio = _ => {
    if(puntaje === 25) {
      setEsGanador(true)
    }
    return ( 
      <>
        <div className='question-section'>
          tu puntaje fue {puntaje} de {preguntasConRespuestas.length} preguntas
          {esGanador ? 
          <>  
            <div className='question-text'>
              Sos el ganador!! Davito querido ganaste un libre de deuda conmigo.  💸
            </div>
            <img src={libreDeDeuda} alt='no hay dibujo del fer'></img> 
          </>
           :
           <>
           <div className='question-text'>
            ¡ Tenes que responder todas bien para ganar el premio ! 😭
          </div>
           </>}
          <button onClick={_ => {reiniciarJuego()}}>Volver a jugar</button>
        </div>
      </>
    )
  }


//   const Perdio = _ => {
//     (<div className='question-section'>
// tu puntaje fue {puntaje} de {preguntasConRespuestas.length} preguntas
// <div className='question-text'>
//             ¡ Tenes que responder todas bien para ganar el premio !
//           </div>
//   <button onClick={_ => {reiniciarJuego()}}>Volver a jugar</button>
// </div>)
//   }

  
  return (
      <div >
        { mostrarResultado
          ? ( <GanooPerdio/>)
          : 
          (
            explicacion
              ? (<div>
                  <h4>Advinaste!</h4>
                  <span>
                    {preguntasConRespuestas[preguntaActual].explicacion}
                  </span>
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
                      {preguntasConRespuestas[preguntaActual].respuestas.map((respuesta, index) => {                        
                         if(respuesta.esCorrecta) {
                          console.clear()
                          console.log('La respuesta correcta:',respuesta.texto, '. Tu puntaje:', puntaje) 
                         }
                        return (
                          <button key={index} onClick={() => manejarRespuesta(respuesta.esCorrecta)}>{respuesta.texto}</button>
                        )
                      })}
                    </div>
                  </>
                )
          )
        }
      </div>
    );
}

export default Quiz
