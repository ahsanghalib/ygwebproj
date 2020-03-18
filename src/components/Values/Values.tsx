import React from 'react';
import classes from './Values.module.scss'
import {valuesData} from '../../data'

function Values() {
    return (
        <div className={classes.Content}>
            {valuesData.map(d => (
                <div key={d.title}>
                    <div className={classes.ContentHead}>{d.title}</div>
                    <div className={classes.ContentDesc}>{d.desc}</div>
                </div>
            ))}
        </div>
    )
}

export default Values