import { Button } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import UserApi from '../../defines/https/UserApi'
import { authUser } from '../../features/auth/authSlice';

export default function RunAction() {
    const user = useSelector(authUser);
    const runAction = async () => {
        let data = await UserApi.sentFriendRequest(user._id, null);
    }
    return (
        <React.Fragment>
            <Button size="small" color="secondary" variant="contained" onClick={runAction}>Run Action</Button>
        </React.Fragment>
    )
}
