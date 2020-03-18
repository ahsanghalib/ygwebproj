import React from 'react';
import {createUseStyles} from 'react-jss'
import BusinessList from '../Business/BusinessList'
import Values from '../Values/Values'
import Scrollbars from 'react-custom-scrollbars'

const useStyles = createUseStyles({
    Main: {
        position: 'fixed',
        // display: 'block',
        backgroundColor: 'rgba(255,255,255, .97)',
        zIndex: '500',
        // margin: '1.25rem',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        top: '0%',
        left: '0%'
    }
})


function PageModal() {

    const classes = useStyles()

    return (

        <div className={classes.Main}>
            <Scrollbars style={{height: '100vh'}}>
                <div style={{padding: '25px'}}>
                    <BusinessList/>
                    <Values/>
                    <Values/>
                </div>
            </Scrollbars>
        </div>

    )
}

export default PageModal