import React from 'react'
import classes from './Management.module.scss'
import {managementData} from '../../data'
import {Link} from 'react-router-dom'
import Image from '../Image'
import {useDispatch} from 'react-redux'
import {pageModalAction} from '../../store/Actions'
import {PageModelEnum} from '../../types'

function Management() {
    const dispatch = useDispatch()
    return (
        <div className={classes.Content}>
            {managementData.map(d => (
                <Link to="/" className={classes.Person} key={d.id}
                      onClick={() => dispatch(pageModalAction(true, d.id, PageModelEnum.mange, 'Management'))}>
                    <div className={classes.Image}>
                        <Image src={d.img} alt={d.name}/>
                    </div>
                    <div className={classes.Detail}>
                        <div className={classes.Quote}>
                            {d.quote}
                        </div>
                        <div className={classes.Name}>
                            <h3>{d.name}</h3>
                            <h5>{d.designation}</h5>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Management