import React from 'react';
import classes from './Management.module.scss'
import Image from '../Image'
import {shallowEqual, useSelector} from 'react-redux'
import {AppStateType} from '../../types'


function ManagementDetail() {
    const store = useSelector((state: AppStateType) => state.mainStore, shallowEqual)

    const mag = store.managementData[store.pageIndex]

    return (
        <div className={classes.DetailsPage}>
            <div className={classes.Image}>
                <Image src={mag!.img} alt={mag!.name}/>
            </div>
            <div className={classes.Detail}>
                <div className={classes.Name}>
                    <h3>{mag!.name}</h3>
                    <h5>{mag!.designation}</h5>
                </div>
                <div className={classes.Quote}>
                    {mag!.quote}
                </div>

                <div className={classes.Full}>
                    {mag!.full}
                </div>

            </div>
        </div>
    )
}

export default ManagementDetail