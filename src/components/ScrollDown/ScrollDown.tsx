import React from 'react';
import classes from './ScrollDown.module.scss'

function ScrollDown() {
    return (
        <div className={classes.ScrollDown}>
            <div className={classes.Chevron}/>
            <div className={classes.Chevron}/>
            <div className={classes.Chevron}/>
            <span className={classes.Text}>Scroll down</span>
        </div>
    )
}

export default ScrollDown