import React from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {getNameError} from 'F:/React-Random/travel-web/src/components/validations'


//(navigation); object{ go ,next, pause, play, previous}
export const Names = ({ formData, setForm, stepHandle, error, setErr }) => {
  const pairArr = Object.entries(formData);
  pairArr.length = 3;

  const values = Object.values(Object.fromEntries(pairArr));

  function handleError(arr) {
    let err = "";
    arr.map((value) => {
      const message = getNameError(value);
      if (message !== null) return (err = `${err} ${message},`);
    });
    setErr(err);
  };


  // console.log(error.split(",")[0], values);

  function label(string) {
    const firstLetter = string.charAt(0).toUpperCase();
    const rest = string.slice(1, -4);
    const lastLetter = string.slice(-4);
    return `${firstLetter}${rest} ${lastLetter}`;
  }

  function button(error) {
    if (error) {
      return (
        <Button
          className="btn-next"
          color="secondary"
          variant="contained"
          fullWidth
          style={{ marginTop: "1rem" }}
          onClick={stepHandle}
        >
          Check values
        </Button>
      );
    }
      return (
        <Button
          className="btn-next"
          color="primary"
          variant="contained"
          fullWidth
          style={{ marginTop: "1rem" }}
          onClick={stepHandle}
        >
          Next
        </Button>
      );
  }

  // Side effects on props change
  React.useEffect(() => {
    handleError(values);
  }, [values]);

  return (
    <Container maxWidth="xs" style={{ marginTop: "3rem" }}>
      <h3 style={{ marginBottom: "1rem", color: "gray", fontSize: "4vh" }}>
        <i className="fas fa-user-circle"></i> Names
      </h3>
      {
        <h5
          role="alert"
          style={{ color: "red", display: "grid", placeItems: "end" }}
        >
          {error.split(",")[0]}
        </h5>
      }
      <form>
        {pairArr.map((pair) => (
          <>
            <TextField
              label={label(pair[0])}
              name={pair[0]}
              value={formData[pair[0]]}
              onChange={setForm}
              required
              margin="normal"
              variant="outlined"
              fullWidth
              autoComplete="off"
            />
          </>
        ))}
        { button(error) }
      </form>
    </Container>
  );
};


