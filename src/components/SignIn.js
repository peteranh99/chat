import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotify } from '../features/notify/NotifySlice';
import { signIn } from '../features/auth/authSlice';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function SignIn() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ email: '', password: '' });
    const onInputChange = (e, field) => {
        setForm({
            ...form,
            [field]: e.target.value

        })
    }
    const checkInfo = () => {
        let { email, password } = form;
        if (email.match(/[a-zA-Z0-9]{4,}@gmail.com/)) {
            if (password.trim().length >= 8) {
                dispatch(signIn({user: {email, password}}))
                history.push('/chat');
            } else notifyInvalid('password invalid');

        } else notifyInvalid('email invalid');
    }
    const notifyInvalid = (message, type = 'error') => {
        dispatch(setNotify({ message, type, open: true }));
    }


    const history = useHistory();

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e) => { e.preventDefault() }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => { onInputChange(e, 'email') }}
                        autoFocus />

                    <TextField
                        onChange={(e) => { onInputChange(e, 'password') }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={checkInfo}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}
