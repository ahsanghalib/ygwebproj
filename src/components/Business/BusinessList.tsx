import React from 'react';
import classes from './Business.module.scss';
import {businessData} from '../../data'
import BusinessCard from './BusinessCard'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {pageModalAction} from '../../store/Actions'
import {PageModelEnum} from '../../types'


function BusinessList() {
    const dispatch = useDispatch()

    return (
        <div className={classes.List}>
            {businessData.map((d, i) => (
                <Link to={"/"}
                      key={d.id}
                      onClick={() => dispatch(pageModalAction(true, i, businessData.length, PageModelEnum.com, 'Business Details'))}>
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
