import './App.scss';
import React, { useState, useEffect } from 'react';
import Switcher from './components/switcher';
import styled, { ThemeProvider } from 'styled-components'
import useKeyPress from 'react-use-keypress';
import { darken } from 'polished';

// styles using Styled components and Polished js;

const $calcWidth = '300px';

const AppBody = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    background-color: ${props => props.theme.main};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`


const AppHeader = styled.header`
  color: ${props => props.theme.text1};
  display: flex;
  justify-content: space-between;
  width: ${$calcWidth};
  max-width: 95%;
  align-items: center;
  & > h1 {
    font-size: 0.7rem;
    margin: 0;
  }
`

const CalcScreen = styled.div`
  height: 80px;
  width: ${$calcWidth};
  max-width: 95%;
  background-color: ${props => props.theme.screen};
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: end;
  color: ${props => props.theme.text1};
  padding: 10px;
`

const SmallCalc = styled.div`
  font-size: 0.6rem;
`

const MainCalc = styled.div`
  text-align: end;
  width: 100%;
  font-size: 0.8rem;
`
// application of Grid Layout for component CalcBody; it allows the order of buttons
// not depend on the Array order, but from the CSS configuration.
const CalcBody = styled.div`
  width: ${$calcWidth};
  max-width: 95%;
  background-color: ${props => props.theme.keypad};
  border-radius: 5px;
  min-height: 200px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    "seven eigth nine del"
    "four five six plus"
    "one two three minus"
    "dot zero divide mult"
    "reset reset equals equals";
`
const CalcButton = styled.button`
  border: none;
  border-radius: 5px;
  color: ${props => props.theme[props.colorScheme]['text']};
  background-color: ${props => props.theme[props.colorScheme]['background']};
  font-size: 0.5rem;
  font-weight: bold;
  transition-duration: 0.1s;
  box-shadow: 0px 4px 0px 0px ${props => props.theme[props.colorScheme]['shadow']};
  &:hover,
  &:active {
    /* use of function Darken (similar to SASS function) for hover effects */
    background-color: ${(props => darken(0.1, props.theme[props.colorScheme]['background']))};
  }
  &:active {
    box-shadow: 0px 1px 0px 0px ${props => props.theme[props.colorScheme]['text']};
    transform: translateY(3px);
  }
`


function App() {
  // calculator buttons for CalcBody component;
  const calcButtons = [
    { class: 'del', buttonSymbol: 'del', colorScheme: 'key2' },
    { class: 'dot', buttonSymbol: '.' },
    { class: 'reset', buttonSymbol: 'reset', colorScheme: 'key2' },
    { class: 'plus', buttonSymbol: '+' },
    { class: 'minus', buttonSymbol: '-' },
    { class: 'divide', buttonSymbol: '/' },
    { class: 'mult', buttonSymbol: '*' },
    { class: 'equals', buttonSymbol: '=', colorScheme: 'key3' },
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
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'Enter', 'Delete', '=', ...operations];

  // states of App component:
  // Active: determines if the operation is being processed or a new one needs to start;
  // Operation: the active operator or factor being defined;
  // Factors: the saved factors for the operation;
  // Theme: to determine which color theme will be used.

  const [active, setActive] = useState(true);
  const [operation, setOperation] = useState('0');
  const [factors, setFactors] = useState('');
  const [theme, setTheme] = useState('one');

  // themeTest is the object which holds the colorStrings for the themes. It will be passe to
  // Theme provider component in order to change appearance (uses useContext hook under the hoods)
  const themeTest = {
    'one': {
      main: 'hsl(222, 26%, 31%)',
      keypad: 'hsl(223, 31%, 20%)',
      screen: 'hsl(224, 36%, 15%)',
      key1: {
        background: 'hsl(30, 25%, 89%)',
        shadow: 'hsl(28, 16%, 65%)',
        text: 'hsl(221, 14%, 31%)',
      },
      key2: {
        background: 'hsl(225, 21%, 49%)',
        shadow: 'hsl(224, 28%, 35%)',
        text: 'hsl(0, 0%, 100%)',
      },
      key3: {
        background: 'hsl(6, 63%, 50%)',
        shadow: 'hsl(6, 70%, 34%)',
        text: 'hsl(0, 0%, 100%)',
      },
      text1: 'hsl(0, 0%, 100%)',
    },
    'two': {
      main: 'hsl(0, 0%, 90%)',
      keypad: 'hsl(0, 5%, 81%)',
      screen: 'hsl(0, 0%, 93%)',
      key1: {
        background: 'hsl(45, 7%, 89%)',
        shadow: 'hsl(35, 11%, 61%)',
        text: 'hsl(60, 10%, 19%)',
      },
      key2: {
        background: 'hsl(185, 42%, 37%)',
        shadow: 'hsl(185, 58%, 25%)',
        text: 'hsl(0, 0%, 100%)',
      },
      key3: {
        background: 'hsl(25, 98%, 40%)',
        shadow: 'hsl(25, 99%, 27%)',
        text: 'hsl(0, 0%, 100%)',
      },

      text1: 'hsl(60, 10%, 19%)',

    },
    'three': {
      main: 'hsl(268, 75%, 9%)',
      keypad: 'hsl(268, 71%, 12%)',
      screen: 'hsl(268, 71%, 12%)',
      key1: {
        background: 'hsl(268, 47%, 21%)',
        shadow: 'hsl(290, 70%, 36%)',
        text: 'hsl(52, 100%, 62%)',
      },
      key2: {
        background: 'hsl(281, 89%, 26%)',
        shadow: 'hsl(285, 91%, 52%)',
        text: 'hsl(0, 0%, 100%)',
      },
      key3: {
        background: 'hsl(176, 100%, 44%)',
        shadow: 'hsl(177, 92%, 70%)',
        text: 'hsl(198, 20%, 13%)',
      },
      text1: 'hsl(52, 100%, 62%)',

    }
  }


  // a function to receive two factors and one operation string and return the result of operation
  const calculate = (factor1, oper, factor2) => {
    switch (oper) {
      case '+': return factor1 + factor2;
      case '-': return factor1 - factor2;
      case '*': return factor1 * factor2;
      case '/': return factor1 / factor2;
      default: return;
    }
  }

  // here we have the Logic of the calculator.
  // it checks the type of input, the Active state, and number of factors saved in factors state.
  // having three factors, the operation is made, and the result is displayed.
  // if less than three, the process is made according to the type of input.

  const handleClick = (value) => {

    if (typeof (value) === 'number' && active === true) {
      if (operation === '0') {
        setOperation(value.toString());
      } else {
        setOperation(operation + value.toString());
      }
    }

    else if (value === '.' && active === true) {
      setOperation(operation + value);
    }

    else if (operations.includes(value)) {
      if (factors.length === 2) {
        setFactors([calculate(factors[0], factors[1], parseFloat(operation)), value])
      } else {
        setFactors([parseFloat(operation), value])
      }
      setOperation('0');
      setActive(true);
    }

    else if ((value === '=' || value === 'Enter') && active === true) {
      setFactors([...factors, parseFloat(operation)])
    }

    else if (value === 'reset') {
      setOperation('0');
      setFactors('');
      setActive(true);
    }

    else if (value === 'del' || value === 'Delete') {
      if (operation.length > 1) setOperation(operation.slice(0, operation.length - 1))
      else if (operation !== '0') setOperation('0')
    }

    else if (typeof (value) === 'number' && active === false) {
      setOperation(value.toString());
      setFactors('');
      setActive(true);
    }

    else if (value === '.' && active === false) {
      setOperation('0.');
      setFactors('');
      setActive(true);
    }
  }

  // after updating states, useEffect hook is responsible for calculate and generating the result
  // in case there are 3 factors to perform the calculation.
  useEffect(() => {
    if (factors.length === 3) {
      let operationResult;
      operationResult = calculate(...factors)
      operationResult = operationResult.toString();
      if (operationResult.length > 14) {
        operationResult = operationResult.slice(0, 14);
      }
      setOperation(operationResult)
      setFactors('');
      setActive(false)
    }
  }, [factors]);

  // the hook useKeyPress here directs the selected keys to the same functions, allowing the 
  // functionality both by mouse and keyboard.
  useKeyPress(keys, (event) => handleClick(parseInt(event.key) || event.key));


  const handleTheme = (e) => {
    setTheme(e.target.value);
  }

  return (
    <ThemeProvider theme={themeTest[theme]}>
      <AppBody>
        <AppHeader>
          <h1>calc</h1>
          <Switcher theme={themeTest[theme]} handleThemeChange={handleTheme} />
        </AppHeader>

        <CalcScreen>
          <SmallCalc>{factors}</SmallCalc>
          <MainCalc>{operation}</MainCalc>
        </CalcScreen>

        <CalcBody>
          {
            calcButtons.map((value, index) => (
              <CalcButton
                onClick={() => handleClick(value.buttonSymbol)}
                key={index}
                className={value.class}
                colorScheme={value.colorScheme || 'key1'}
              >
                {value.buttonSymbol}
              </CalcButton>
            ))
          }
        </CalcBody>
      </AppBody>
    </ThemeProvider>
  );
}

export default App;
