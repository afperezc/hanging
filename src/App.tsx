import { useEffect, useState } from 'react';
import {letters} from './helpers/letters';

import './App.css'
import { HangImage } from './components/HangImage';
import { getRandomWord } from './helpers/getRandomWord';

function App() {

  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length)); //UseState es propio de react y sirve para reaccionar de acorde a los cambios
  const [ attempts, setAttempts ] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  // Determinar si la persona perdio
  useEffect(()=>{
    if(attempts >= 9){
      setLose (true);
    }
  }, [attempts]); //Hooks

  // Determinar si la persona gano
  useEffect(()=>{
    // console.log(hiddenWord); 
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if(currentHiddenWord === word){
      setWon(true);
    }
  }, [hiddenWord])


  const checkLetter = (letter: string) => {

    if(lose) return;
    if(won) return;

    if(!word.includes(letter)){
      setAttempts(Math.min(attempts + 1,9));
      return;
    }    

    const hiddenWordArray = hiddenWord.split(' ');

    
    for(let i =0; i <word.length; i++){
      if (word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));
  }

  const newGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setHiddenWord('_ '.repeat(word.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className='App'>
      
    {/* Imagenes */}
    <HangImage imageNumber = {attempts} />

    {/* Palabra oculta */}
    <h3>{hiddenWord}</h3>

    {/* Contador de intentos */}
    <h3>Intentos: {attempts}</h3>

    {/* Mesaje si perdio */}
    {
      (lose)
       ?  <h2> Perdio {word} </h2> 
       : ''
    }

       {/* Mesaje si gano */}
       {
      (won)
       ?  <h2> 'Felicidades usted gano'</h2> 
       : ''
    }

    {/* Botones de letras */}
    {
      letters.map( (letter) => (
        <button 
        onClick = {() => checkLetter(letter)}
        key={letter}
        >{letter}
        </button>
      ))
    }

<br /><br />
<button onClick={ newGame}>Nuevo Juego</button>

    </div>
  )

};



export default App
