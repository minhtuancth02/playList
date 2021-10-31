import React, {useState , useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'

import Modal from 'F:/React-Random/travel-web/src/Modal'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import { useSpring, animated } from 'react-spring';


const useStyles = makeStyles({
  root: {
    maxWidth: 440,
  },
  media: {
    height: 250,
  },
});

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: relative;
  z-index: 1000;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
    color: #fff;
    border: none;
    cursor: pointer;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  color: linear-gradient( #FE6B8B 30%, #FF8E53 90%);
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 1000;
`;

const styles = { transition: 'all 1.6s', color: '#d32f2f' }

const Profile = () => {
    const classes = useStyles();
    const { currentUser, Logout , UpdatePassword} = useAuth();
    const History = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [errors, setErrors] = useState('');

    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const animation = useSpring({
        config: {
            duration: 200
        },
        opacity: isModal ? 1 : 0,
        transform: isModal ? `translateX(0%)` : `translateX(-100%)`
    });

    async function handleLogout() {
        await Logout();
        History.push('/login/login-form');
    };

    function handleSubmit() {
        const promises = [];
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setErrors(`*Password not match!`);
        };

        setErrors('');
        setIsLoading(true);
        (passwordRef.current.value) &&
            promises.push(UpdatePassword(passwordRef.current.value));
        
        Promise
            .all(promises)
            .then(() => {
                alert('Change Password success')
                History.push('/login/login-form')
            })
            .catch(err => setErrors(err.message))
            .finally(() => setIsLoading(false))
    };

    const PropsModal = { isModal, setIsModal , currentUser };

    return (
        <>
            <Modal {...PropsModal}>
                 <animated.div style={animation}>
                    <ModalWrapper showModal={isModal}>
                        <ModalContent>
                            <Container maxWidth='xs' style={{ marginTop: '4rem', marginBottom: '3rem' }}>
                                <h3 style={{ marginBottom: '1.2rem', color: '#DEB887', fontSize: '4.2vh' }}>
                                    <i className="fas fa-edit"></i> Change Password
                                </h3>
                                {errors && <Alert severity='error' style={styles}>{errors}</Alert>}
                                <TextField
                                    label="Email"
                                    name="email"
                                    margin='normal' variant='outlined' autoComplete='off' fullWidth
                                    disabled
                                    defaultValue={ currentUser.email }
                                />
                                <TextField
                                    label="New Password"
                                    name="password"
                                    type='password'
                                    inputRef={passwordRef}
                                    placeholder='Leave blank to keep the same'
                                    margin='normal' variant='outlined' autoComplete='off' fullWidth
                                />
                                <TextField
                                    label="Confirmation"
                                    name="passwordConfirm"
                                    type='password'
                                    inputRef={passwordConfirmRef}
                                    placeholder='Leave blank to keep the same'
                                    margin='normal' variant='outlined' autoComplete='off' fullWidth
                                />
                                <Button
                                    variant='contained' fullWidth color='primary'
                                    style={{ marginTop: '1rem', marginBottom: "1rem" }}
                                    disable={isLoading}
                                    onClick={ handleSubmit }
                                >
                                    Update
                                </Button>
                            </Container>
                        </ModalContent>
                        <CloseModalButton
                            aria-label='Close modal'
                            onClick={() => setIsModal(prev => !prev)}
                        />
                    </ModalWrapper>
                </animated.div>
            </Modal>

            <Container maxWidth='xs' style={{ marginTop: '3.5rem', marginBottom: '7rem' }} >
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="images/img-12.jpg"
                            title="Ready for more" defer
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h3">
                                <Alert severity="success">{`Welcome, ${currentUser.email}`}</Alert>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {currentUser !== null &&
                                    <cite>{`Email: ${currentUser.email}`}</cite>
                                }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="medium" color="primary" onClick={handleLogout}>
                            log out<i className="fas fa-sign-out-alt" style={{ fontSize: '1em', paddingLeft: '0.5em' }}></i>
                        </Button>
                        <Button size="medium" color="primary" onClick={() => setIsModal(prev => !prev)}>
                            edit password<i className="fas fa-edit" style={{ fontSize: '1em', paddingLeft: '0.5em' }}></i>
                        </Button>
                    </CardActions>
                </Card>
            </Container>                    
        </>    
    );
};

export default Profile

// async function handleSubmit() {
//         if (passwordRef.current.value !== passwordConfirmRef.current.value) return setErrors(`*Password do not match!`);
        
//         try {
//             setErrors('');
//             setIsLoading(true);
//             await UpdateEmail(emailRef.current.value);
//             await UpdatePassword(passwordRef.current.value);
//             History.push('/login');
//             alert(`Update Profile success`);
//         }
//         catch { setErrors('Failed to update profile, Try again!') };

//         setIsLoading(false);
//     };