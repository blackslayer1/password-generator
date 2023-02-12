import './App.scss';
import { useState, useEffect } from 'react';

function App() {
  const [strength, setStrength] = useState<string>('Password Strength');
  const [value, setValue] = useState<number>(0);

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(()=>{
    let text = document.getElementById('bar__value') as HTMLInputElement;


      if(value <= 20){
        setStrength('Very Weak');
        text.classList.add('red');
        text.classList.remove('orange');
        text.classList.remove('green');
      } else if (value <= 40){
        setStrength('Weak');
        text.classList.add('red');
        text.classList.remove('orange');
        text.classList.remove('green');
      } else if (value <= 60){
      setStrength('Medium');
      text.classList.remove('red');
      text.classList.add('orange');
      text.classList.remove('green');
      } else if (value <= 80){
        setStrength('Strong');
        text.classList.remove('red');
        text.classList.remove('orange');
        text.classList.add('green');
      } else if (value >= 81){
        setStrength('Very Strong');
        text.classList.remove('red');
        text.classList.remove('orange');
        text.classList.add('green');
      }

  }, [value])

  const generatePassword = () => {
    const alphabetUpper: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'];
    const alphabetLower: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',  's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const symbols: string[] = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+'];
    let upper = (document.getElementById('upper')! as HTMLInputElement);
    let lower = (document.getElementById('lower')! as HTMLInputElement);
    let numbersCheckbox = (document.getElementById('numbers')! as HTMLInputElement);
    let symbolsCheckbox = (document.getElementById('symbols')! as HTMLInputElement);
    let excludeSameCharacters = (document.getElementById('excludeSameCharacters')! as HTMLInputElement);
    let passLength = (document.getElementById('length')! as HTMLInputElement).value;
    let passArray: string[] = [];
    let checkCount = excludeSameCharacters.checked ? (document.querySelectorAll('input[type="checkbox"]:checked')!.length)-1 : (document.querySelectorAll('input[type="checkbox"]:checked')!.length);
    let passwordContainer = (document.getElementById('passwordContainer')! as HTMLInputElement);
    let neonbar = document.getElementById('neon-bar')!;

    if(neonbar.style.visibility === "hidden"){
      neonbar.style.visibility="visible";
    }

    for(let i=0; i<parseInt(passLength); i++){
      for(let j=0; j<checkCount/parseInt(passLength); j++){
        if(excludeSameCharacters.checked === false){
          if(upper.checked){
            passArray.push(alphabetUpper[randomIntFromInterval(0, alphabetUpper.length-1)]);
          }
          if(lower.checked){
            passArray.push(alphabetLower[randomIntFromInterval(0, alphabetLower.length-1)]);
          }
          if(symbolsCheckbox.checked){
            passArray.push(symbols[randomIntFromInterval(0, symbols.length-1)]);
          }
          if(numbersCheckbox.checked){
            passArray.push(numbers[randomIntFromInterval(0, numbers.length-1)]);
          }
        } else {
          if(upper.checked){
            let random = randomIntFromInterval(0, alphabetUpper.length-1);
            if(passArray.includes(alphabetUpper[random])){
              while(passArray.includes(alphabetUpper[random])){
                random = randomIntFromInterval(0, alphabetUpper.length-1);
              }
            }
            passArray.push(alphabetUpper[random]);
          }
          if(lower.checked){
            let random = randomIntFromInterval(0, alphabetLower.length-1);
            if(passArray.includes(alphabetLower[random])){
              while(passArray.includes(alphabetLower[random])){
                random = randomIntFromInterval(0, alphabetLower.length-1);
              }
            }
            passArray.push(alphabetLower[random]);
          }
          if(symbolsCheckbox.checked){
            let random = randomIntFromInterval(0, symbols.length-1);
            if(passArray.includes(symbols[random])){
              while(passArray.includes(symbols[random])){
                random = randomIntFromInterval(0, symbols.length-1);
              }
            }
            passArray.push(symbols[random]);
          }
          if(numbersCheckbox.checked){
            let random = randomIntFromInterval(0, numbers.length-1);
            if(passArray.includes(numbers[random])){
              while(passArray.includes(numbers[random])){
                random = randomIntFromInterval(0, numbers.length-1);
              }
            }
            passArray.push(numbers[random]);
          }
        }
      }
    }
    let pass = ((passArray.join("") as string).substring(0, parseInt(passLength)) as string);
    passwordContainer.innerHTML="";
    passwordContainer.insertAdjacentHTML('beforeend', pass);
    let s = checkCount;
    if(parseInt(passLength) >= 20){
      s+=6;
    } else if (parseInt(passLength) >= 12){
      s+=4;
    } else if (parseInt(passLength) < 12){
      s+=2;
    }
    setValue((s/2)*25);
  }

  const changeHandler = () => {
    let excludeSameCharacters = (document.getElementById('excludeSameCharacters')! as HTMLInputElement);
    let checkCount = excludeSameCharacters.checked ? (document.querySelectorAll('input[type="checkbox"]:checked')!.length)-1 : (document.querySelectorAll('input[type="checkbox"]:checked')!.length);
    let checkedBox = (document.querySelectorAll('input[type="checkbox"]:checked')!);
    if(checkCount === 1){
      (checkedBox[0] as HTMLInputElement).style.opacity="50%";
      (checkedBox[0] as HTMLInputElement).style.pointerEvents="none";
    } else {
      for(let i=0; i<checkedBox.length; i++){
        (checkedBox[i] as HTMLInputElement).style.pointerEvents="all";
        (checkedBox[i] as HTMLInputElement).style.opacity="100%";
      }
    }
  }

  return (
    <div className="App">
      <h2>Password Generator</h2>
      <button onClick={generatePassword} className="custom-btn btn-7"><span>Generate Password</span></button>
      <textarea id="passwordContainer" readOnly></textarea>
      <div className="passLength">
      <label>Password Length</label>
      <select id="length">
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12" selected>12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
      </select>
      </div>
      <div className="checkbox">
      <input onChange={changeHandler} id="upper" style={{marginLeft: "6px"}} type="checkbox"/>
      <label>Uppercase Letters</label>
      <br/>
      <input onChange={changeHandler} id="lower" type="checkbox"/>
      <label>Lowercase Letters</label>
      <br/>
      <input onChange={changeHandler} id="symbols" style={{marginLeft: "54px"}}  type="checkbox"/>
      <label>Symbols (!@#$%^&*()+)</label>
      <br/>
      <input onChange={changeHandler} id="numbers" type="checkbox"/>
      <label style={{marginRight: "60px"}}>Numbers</label>
      <br/>
      <input id="excludeSameCharacters" style={{marginLeft: "50px"}} type="checkbox"/>
      <label>Exclude same characters</label>
      </div>
      <div style={{visibility: 'hidden'}} id="neon-bar" className="neon-bar">
        <progress className='bar' value={value} max='100'></progress>
        <span id="bar__value" className='bar__value'>{strength}</span>
      </div>
    </div>
  );
}

export default App;