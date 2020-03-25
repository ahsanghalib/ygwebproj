import React from 'react';
import {businessData} from '../../data'
import classes from './Business.module.scss';
import Image from '../Image'
import {shallowEqual, useSelector} from 'react-redux'
import {AppStateType} from '../../types'


function BusinessDetail() {

    const store = useSelector((state: AppStateType) => state.mainStore, shallowEqual)

    const business = businessData[store.pageIndex]

    return (
        <div className={classes.BusinessDetail}>
            <div className={classes.Logo}>
                <Image src={business!.logoUrl} alt={business!.title}/>
            </div>
            <div className={classes.Full}>
                <div className={classes.Title}>
                    {business!.title}
                </div>
                <div className={classes.Slog}>
                    {business!.slog}
                </div>

                <div className={classes.Content}>
                    {business!.detail}
                </div>
            </div>
        </div>
    )

}

export default BusinessDetail