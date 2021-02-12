import React from 'react'
import MyAvatar from '../MyAvatar/MyAvatar';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Box, Button, makeStyles } from '@material-ui/core'

import PersonIcon from '@material-ui/icons/Person';
import Slt from '../../defines/Slt'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isLogged, loggedUser } from '../../features/auth/authSlice'
import { signOut } from '../../features/auth/authSlice';
import { useCookies } from 'react-cookie'
import DayNightSwitch from '../DayNightSwitch/DayNightSwitch'

const useStyles = makeStyles({
    flexGrowStyle: {
        flexGrow: 1,
    }
})

export default function Header(props) {
    const [cookies, setCookie, removeCookie] = useCookies('loggedUser');
    const user = useSelector(loggedUser);
    const dispatch = useDispatch();
    const logged = useSelector(isLogged);
    const classes = useStyles(props);
    const location = useLocation();
    const pathName = location.pathname;
    const history = useHistory();

    const onSignout = () => {
        removeCookie('loggedUser');
        dispatch(signOut());
        history.push('/');
    }

    return (
        <div>
            <AppBar position="static" color="primary" id={Slt.mainAppBar}>
                <Toolbar>
                    {/* 
                    <IconButton aria-label="menu icon" color="inherit">
                        <MenuIcon></MenuIcon>
                    </IconButton>
                     */}
                    <Typography variant="h6" className={classes.flexGrowStyle}>
                        Messenger
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <DayNightSwitch></DayNightSwitch>
                        {(logged) ? (<MyAvatar name={user.name} single={user.single} picture={user.picture}></MyAvatar>) : null}
                        <Button disabled={pathName === '/login'} startIcon={(!logged) ? <PersonIcon></PersonIcon> : null} color="inherit" onClick={() => {
                            onSignout();
                        }}>
                            <Typography >{(logged) ? 'Sign out' : 'Sign in'}</Typography>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}
