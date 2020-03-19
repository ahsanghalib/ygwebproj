import React from 'react';
import {managementData} from '../../data'
import classes from './Management.module.scss'
import Image from '../Image'


function ManagementDetail(props: {id: string}) {
    const mag = managementData.find(d => d.id === props.id)

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