import React from 'react';
import classes from './Business.module.scss'
import Image from '../Image'


interface BusinessCardProps {
    id: string;
    title: string;
    logoUrl: string;
    imgAlt: string;
    slog: string
}

function BusinessCard(props: BusinessCardProps) {

    return (

        <div className={classes.Card} key={props.id}>
            <div className={classes.Logo}>
                <Image src={props.logoUrl} alt={props.imgAlt}/>
            </div>
            <div className={classes.Details}>
                <div className={classes.Title}><b>{props.title}</b></div>
                <div className={classes.Slog}>{props.slog}</div>
            </div>
        </div>

    )
}

export default BusinessCard