const operations = ['+', '-', '/', 'x']
const [firstOp, setFirstOp] = useState('');
  const [secOp, setSecOp] = useState('');
  const [operation, setOperation] = useState('');
  const [isResult, setResult] = useState(false);

  const handleClick = (value) => {

    if (!operation) {
      if (Number.isInteger(value) || value === '.') {
        if (firstOp.length <= 12) setFirstOp(firstOp + value.toString());
      }
      else if (operations.includes(value)) {
        setOperation(value);
      }
      else if (value === 'del') {
        if (firstOp) setFirstOp(firstOp.slice(0, firstOp.length - 1))
      }
    }
    else {
      if (Number.isInteger(value) || value === '.') {
        if (secOp.length <= 12) setSecOp(secOp + value.toString());
      }
      else if (value === 'del') {
        if (secOp) setSecOp(secOp.slice(0, secOp.length - 1))
        else setOperation('');
      }

      else if (value === '=') {
        let result;
        switch (operation) {
          case '+':
            result = (parseFloat(firstOp) + parseFloat(secOp));
            break;
          case '-':
            result = (parseFloat(firstOp) - parseFloat(secOp));
            break;
          case '/':
            result = (parseFloat(firstOp) / parseFloat(secOp));
            break;
          case 'x':
            result = (parseFloat(firstOp) * parseFloat(secOp));
            break;
        }
        result = result.toString();
        if (result.length > 12) {
          result = result.slice(0, 12)
        }
        setFirstOp(result)
        setOperation('');
        setSecOp('');
      }
    }

    if (value === 'reset') {
      setFirstOp('');
      setSecOp('');
      setOperation('');
    }
  }


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


