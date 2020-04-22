import React from 'react';
import classes from './Values.module.scss'
import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from '../../types';

function Values() {
    const store = useSelector(
        (state: AppStateType) => state.mainStore,
        shallowEqual
      );
    return (
        <div className={classes.Content}>
            {store.valuesData.map(d => (
                <div key={d.title}>
                    <div className={classes.ContentHead}>{d.title}</div>
                    <div className={classes.ContentDesc}>{d.desc}</div>
                </div>
            ))}
        </div>
    )
}

export default Values