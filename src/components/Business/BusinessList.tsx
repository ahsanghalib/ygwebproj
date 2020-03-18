import React from 'react';
import classes from './Business.module.scss';
import {businessData} from '../../data'
import BusinessCard from './BusinessCard'
import {Link} from 'react-router-dom'


function BusinessList() {
    return (
        <div className={classes.List}>
            {businessData.map(d => (
                <Link to={"/"} key={d.id} onClick={() => console.log(`clicked ${d.id}`)}>
                    <BusinessCard
                        id={d.id}
                        logoUrl={d.logoUrl}
                        title={d.title}
                        slog={d.slog}
                        imgAlt={d.imgAlt}
                    />
                </Link>
            ))}
        </div>
    )
}

export default BusinessList
