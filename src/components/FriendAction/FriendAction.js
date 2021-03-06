import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import mainStyles from '../../defines/styles/MainStyles'
import UserApi from '../../defines/https/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../features/auth/authSlice';
import MySocket from '../../defines/Socket/MySocket';
import ConversationLink from '../ConversationLink/ConversationLink';
import { onUnFriend } from '../../features/friend/FriendSlice';

const ITEM_HEIGHT = 48;

export default function SentRequestAction({ item }) {

    const dispatch = useDispatch();
    const user = useSelector(authUser);
    const classes = mainStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // click
    const onUnfriendClick = async () => {
        const data = await UserApi.unfriend(user._id, item._id);
        if (data.status === 'succeeded') {
            MySocket.emitUnfriend(user, item._id);
            dispatch(onUnFriend({ user: item }));
        }
        setAnchorEl(null);
    }

    const onChat = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem>
                    <ConversationLink item={item} style={{ width: '100%' }}>
                        <Button onClick={onChat} variant="contained" size="small" fullWidth color="primary" className={classes.buttonStyle}>Chat</Button>
                    </ConversationLink>
                </MenuItem>
                <MenuItem><Button onClick={onUnfriendClick} variant="contained" size="small" fullWidth className={classes.buttonStyle}>Unfriend</Button></MenuItem>
            </Menu>
        </div>
    );
}
