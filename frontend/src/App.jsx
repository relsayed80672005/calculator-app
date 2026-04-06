import React, { useState } from 'react';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'Clear') {
      setExpression('');
    } else if (value === 'Backspace') {
      setExpression(expression.slice(0, -1));
    } else if (value === '=') {
      calculate();
    } else if (value === '+/-') {
      // Simple toggle sign, assume at end or something, for now prepend -
      if (expression.startsWith('-')) {
        setExpression(expression.slice(1));
      } else {
        setExpression('-' + expression);
      }
    } else {
      setExpression(expression + value);
    }
  };

  const calculate = async () => {
    try {
      const response = await fetch('http://localhost:3001/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
      });
      const data = await response.json();
      setExpression(data.result);
    } catch (error) {
      setExpression('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="display">{expression || '0'}</div>
      <div className="buttons">
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('÷')}>÷</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('x')}>x</button>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={() => handleButtonClick('=')}>=</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
        <button onClick={() => handleButtonClick('%')}>%</button>
        <button onClick={() => handleButtonClick('+/-')}>+/-</button>
        <button onClick={() => handleButtonClick('Clear')}>Clear</button>
        <button onClick={() => handleButtonClick('Backspace')}>⌫</button>
      </div>
    </div>
  );
}

export default App;