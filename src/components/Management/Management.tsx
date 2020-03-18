import React from 'react'
import classes from './Management.module.scss'
import {managementData} from '../../data'
import {Link} from 'react-router-dom'
import Image from '../Image'

function Management() {
    return (
        <div className={classes.Content}>
            {managementData.map(d => (
                <Link to="/" className={classes.Person} key={d.id} onClick={() => console.log(`clicked ${d.id}`)}>
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