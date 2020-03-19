import React from 'react';
import classes from './WebPortals.module.scss'
import Login from './Login/Login'

const WebPortal: React.FC = props => {
    return (
        <div>
            <div className={classes.Hero}/>
            <div className={classes.Container}>
                <Login/>
            </div>

        </div>
    )
}

export default WebPortal