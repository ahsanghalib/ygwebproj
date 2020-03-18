import React from 'react';
import {Link} from 'react-router-dom';
import classes from './NotFound.module.scss';

const NotFound: React.FC = props => {

    return (
        <div>
            <div className={classes.Hero}/>
            <div className={classes.Container}>
                <div className={classes.NotFound}>
                    <div className={classes.Notfound404}>
                        <h1>404</h1>
                    </div>
                    <h2>Oops! This Page Could Not Be Found</h2>
                    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is
                        temporarily unavailable</p>
                    <Link to={"/"}>Go To Homepage</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound