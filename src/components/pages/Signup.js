import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { FormControl } from '@material-ui/core';

import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js'
import { AlertComponent } from './Alert'
// import Alert from '@material-ui/lab/Alert'


const inputDefault = { name: '', value: '' };
const errDefault = {
    email: false,
    password: true,
    passwordConfirm: true,
};

// SignUp Form 😃
const SignUp = () => {
    const History = useHistory();
    const { Signup, currentUser, loadingUser } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const errRef = useRef();

    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState(() => inputDefault);
    const [isErrors, setIsErrors] = useState(errDefault);

    const getErrRef = (elem) => {
        return errRef.current = elem;
    };

    const handleChange = (e) => {
        if (e && e.target && e.target.value) {
            let { name, value } = e.target;
            setInputValue({ name, value });
            errRef.current !== null
                ? setIsErrors({ [name]: false, ...isErrors })
                : setIsErrors({
                    password: false,
                    passwordConfirm: false
                });
        }
    };

    async function handleSubmit() {
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return alert('Incorrect Password Confirm')
        };

        try {
            await Signup({
                email: emailRef.current.value,
                password: passwordRef.current.value
            });
            History.push('/login'); // navigate Propfile
            alert(`Sign Up Success`);
        }
        catch(err) { alert(err) }
        setIsLoading(false);
    };

    const alertProps = { inputValue, setIsErrors, getErrRef, errRef, passwordRef, currentUser, loadingUser };

    return (
        <>
            <Container maxWidth='xs' style={{ marginTop: '3.5rem', marginBottom: '7rem' }} >
                <FormControl margin='normal' autoComplete='off' fullWidth >
                    <h3 style={{ marginBottom: '1.1rem', color: '#DEB887', fontSize: '4.2vh' }}>
                        <i className="fas fa-user-plus"></i> Sign Up
                    </h3>
                    <AlertComponent {...alertProps} />
                    <TextField
                        label="Email..."
                        name="email"
                        required autoFocus
                        inputRef={emailRef}
                        onChange={handleChange}
                        margin='normal' variant='outlined' autoComplete='off' fullWidth
                    />
                    <TextField
                        label="Password..."
                        name="password"
                        type='password'
                        inputRef={passwordRef}
                        onChange={handleChange}
                        disabled={isErrors.password}
                        margin='normal' variant='outlined' autoComplete='off' fullWidth
                    />
                    <TextField
                        label="Confirm..."
                        name="passwordConfirm"
                        type='password'
                        inputRef={passwordConfirmRef}
                        onChange={handleChange}
                        onBlur={() => {
                            (errRef.current === null) ? setIsLoading(false) : setIsLoading(true)
                        }}
                        disabled={isErrors.passwordConfirm}
                        margin='normal' variant='outlined' autoComplete='off' fullWidth
                    />
                    <Button
                        variant='contained' fullWidth color='primary'
                        style={{ marginTop: '1rem', marginBottom: "1rem" }}
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <h5 style={{ color: '#778899', fontSize: '2.1vh' }}>
                        <cite>Already have an account? <span style={{ cursor: 'pointer', color: '#e8983f', textDecoration: 'underline' }}>
                            <Link to='/login/login-form'>Login</Link></span>
                        </cite>
                    </h5>
                </FormControl>
            </Container>
        </>
    );
};


export default SignUp
