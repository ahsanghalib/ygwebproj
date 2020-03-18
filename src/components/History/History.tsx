import React from 'react'
import classes from './History.module.scss'
import {historyData} from '../../data'

function History() {

    return (
        <div className={classes.Content}>
            <div className={classes.Title}>
                {historyData.title}
            </div>

            <div className={classes.Detail}>
                {historyData.data}
            </div>
        </div>
    )
}

export default History