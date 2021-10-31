import React, {useState , useRef , useEffect} from 'react'
import Alert from '@material-ui/lab/Alert'
import { isEmail ,isRegx, isRequired ,isConfirm} from '../validations'

const styles = {transition:'all 1.6s', color:'#d32f2f'}


const AlertComponent = ({ inputValue, getErrRef, errRef }) => {
    const { name, value } = inputValue;
    const [valueErr, setValueErr] = useState("");
    const passwordInput = useRef("");
    
  function validate(validations, value) {
    const valArr = validations
      .map((validator) => validator(value))
      .filter((errMsg) => errMsg.length > 0)
      .join(", ");
    setValueErr(valArr);
  }

  function ErrorDisplay(name, value) {
    switch (name) {
      case "email": {
        return validate([isEmail], value);
      }
      case "password": {
        return validate([isRequired, isRegx], value);
      }
      case "passwordConfirm": {
        return validate([isConfirm], [value, passwordInput.current]);
      }
      default:
        return (
          <Alert className="alert-info" severity="info">
            Fill in your information!
          </Alert>
        );
    }
  }

  useEffect(() => {
    ErrorDisplay(name, value);
    getErrRef(errRef.current);
    if (name === "password") {
      passwordInput.current = value;
    }
  }, [name, value]);

  return (
    <>
      {valueErr.length > 0 && (
        <Alert ref={errRef} severity="error" style={styles}>
          {valueErr}
        </Alert>
      )}
    </>
  );
};

export { AlertComponent }
