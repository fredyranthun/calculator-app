import './App.scss';
import React, { useState, useEffect } from 'react';
import Switcher from './components/switcher';

function App() {

  const calcButtons = [
    { class: 'del', buttonSymbol: 'del' },
    { class: 'dot', buttonSymbol: '.' },
    { class: 'reset', buttonSymbol: 'reset' },
    { class: 'plus', buttonSymbol: '+' },
    { class: 'minus', buttonSymbol: '-' },
    { class: 'divide', buttonSymbol: '/' },
    { class: 'mult', buttonSymbol: '*' },
    { class: 'equals', buttonSymbol: '=' },
    { class: 'one', buttonSymbol: 1 },
    { class: 'two', buttonSymbol: 2 },
    { class: 'three', buttonSymbol: 3 },
    { class: 'four', buttonSymbol: 4 },
    { class: 'five', buttonSymbol: 5 },
    { class: 'six', buttonSymbol: 6 },
    { class: 'seven', buttonSymbol: 7 },
    { class: 'eight', buttonSymbol: 8 },
    { class: 'nine', buttonSymbol: 9 },
    { class: 'zero', buttonSymbol: 0 },
  ]

  const operations = ['+', '-', '/', '*']

  const [active, setActive] = useState(true);
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');

  const [theme, setTheme] = useState('one');


  const handleClick = (value) => {
    if (!operation && operations.includes(value)) {
      setOperation('0' + value)
      return;
    }
    if (active) {
      switch (value) {
        case 'del':
          setOperation(operation.slice(0, operation.length - 1));
          break;
        case 'reset':
          setOperation('')
          break;
        case '=':
          setOperation(eval(operation).toString());
          setActive(false);
          break;
        default:
          setOperation(operation + value.toString())
      }
    }
    else {
      switch (value) {
        case 'del':
          setOperation('');
          setActive(true);
          break;
        case 'reset':
          setOperation('');
          setActive(true);
          break;
        case '=':
          break;
        default:
          setOperation(value);
          setActive(true);
      }
    }
  };
  useEffect(() => {
    let op = operation;
    try {
      eval(op)
    } catch (e) {
      if (e instanceof SyntaxError) {
        op = operation.slice(0, operation.length - 1);
      }
    }
    finally {
      setResult(eval(op))
    }
  }, [operation]);

  const handleTheme = (e) => {
    setTheme(e.target.value);
  }

  return (
    <div className="App">

      <header className="App-header">
        <h1>calc</h1>
        <Switcher handleThemeChange={handleTheme} checked={theme}  />
      </header>

      <div className='calcScreen'>
        <div className="small">{operation}</div>
        <div className="mainCalc">{operation ? '=' : ''}{result ? result : '0'}</div>
      </div>

      <div className='calcBody grid-container'>
        {
          calcButtons.map((value, index) => (
            <button
              onClick={() => handleClick(value.buttonSymbol)}
              key={index}
              className={`buttonCalc ${value.class}`}
            >
              {value.buttonSymbol}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default App;
