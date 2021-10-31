import React, { useRef, useState } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js'
import Alert from '@material-ui/lab/Alert'


const h5 = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#778899',
    fontSize: '2.1vh'
};
const h3 = { marginBottom: '1.1rem', color: '#DEB887', fontSize: '4.2vh' };

const Sign = {
    color: '#778899',
    textDecoration: 'none'
};

const styles = { transition: 'all 1.6s' };


const ResetPassword = () => {

    const emailRef = useRef();
    const History = useHistory();

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { ResetPassword } = useAuth();

    const asyncLowerCase = (char) =>
        new Promise(resolve =>
            setTimeout(
                () => resolve(char.toLowerCase()),
                Math.floor(Math.random() * 1000)
            )
        );

    // const lowercaseItems = (values) => {

    //     const emailArray = values.split('').map(async char => {
    //         const lowercaseItem = await asyncLowerCase(char);
    //         console.log(lowercaseItem);
    //     });

    //     return Promise.all(emailArray).then(() => {
    //         console.log('reset password');
    //     });
    // };


    async function handleClick() {
        try {
            setMessage('');
            setErrors('');
            setIsLoading(true);
            await ResetPassword(emailRef.current.value);
            setMessage('Check your inbox email!');
            setTimeout(() => History.push('/login/login-form'),2000);
        }
        catch(err) { setErrors(err.message) };

        setIsLoading(false);
    };

    return (
        <>
            <Container maxWidth='xs' style={{ marginTop: '3.5rem', marginBottom: '7rem' }} >
                <h3 style={h3}>
                    <i class="fas fa-unlock"></i> Reset Password
                </h3>
                {message.length > 0 && <Alert severity="success" style={styles}>{message}</Alert>}
                {errors && <Alert severity="error" style={styles}>{errors}</Alert>}
                <TextField
                    label="Email"
                    name="email"
                    inputRef={emailRef}
                    required autoFocus
                    margin='normal' variant='outlined' autoComplete='off' fullWidth
                />
                <Button
                    variant='contained' fullWidth color='primary'
                    style={{ marginTop: '1rem', marginBottom: "1rem" }}
                    disable={isLoading}
                    onClick={handleClick}
                >
                    Reset password
                </Button>
                <div style={h5}>
                    <Link to='/login/signup' style={Sign}>Create an Account ? Sign Up</Link>
                    <Link to='/login/login-form' style={Sign}>Login to your Account</Link>
                </div>
            </Container>
        </>
    );
}

export default ResetPassword
