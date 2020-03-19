import React from 'react';
import {businessData} from '../../data'
import classes from './Business.module.scss';
import Image from '../Image'


function BusinessDetail(props: { company: string }) {

    const business = businessData.find(d => d.id === props.company)

    return (
        <div className={classes.BusinessDetail}>
            <div className={classes.Logo}>
                <Image src={business!.logoUrl} alt={business!.title}/>
            </div>
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
    )

}

export default BusinessDetail