import React, { useRef, useState }from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// import { FormControl ,Input } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js'
// import useLogin from './customHook/useLogin'


const h5 = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#778899',
    fontSize: '2.1vh',
};

const Styles = {
    color: '#778899',
    textDecoration: 'none'
};

const loginTitle = { marginBottom: '1.1rem', color: '#DEB887', fontSize: '4.2vh' };


const LoginForm = () => {
    // const { values, setUsername, setPassword, login, logout } = useLogin();

    const History = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const [errors, setErrors] = useState(null);
    const { Login } = useAuth();

    async function handleSubmit() {
        try {
            setErrors('')
            await Login(emailRef.current.value, passwordRef.current.value);
            alert(`Welcome & Enjoy your AVENTURE!`);
            History.push('/login');
        }
        catch (err) { setErrors(err.message) }
    };

    return (
        <>
            <Container maxWidth='xs' style={{ marginTop: '3.5rem', marginBottom: '7rem' }} >
                <h3 style={loginTitle}>
                    <i className="fas fa-sign-in-alt"></i> Log In
                </h3>
                { errors && <Alert severity="error">{errors}</Alert> }
                <TextField
                    label="Email"
                    name="email"
                    inputRef={emailRef}
                    required autoFocus
                    margin='normal' variant='outlined' autoComplete='off' fullWidth
                />
                <TextField
                    label="Password"
                    name="password"
                    type='password'
                    required
                    inputRef={passwordRef}
                    margin='normal' variant='outlined' autoComplete='off' fullWidth
                />
                <Button
                    variant='contained' fullWidth color='primary'
                    style={{ marginTop: '1rem', marginBottom: "1rem" }}
                    onClick={handleSubmit}
                >
                    Log in
                </Button>
                <div style={h5}>
                    <Link to='/login/signup' style={Styles}>Don’t have an account? Sign Up</Link>
                    <Link to='/login/reset-password' style={Styles}>Forgot password?</Link>
                </div>
            </Container>
        </>
    );
};

export default LoginForm
