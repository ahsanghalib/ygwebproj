import React from 'react';
import {BarLoader} from 'react-spinners'

const Loader: React.FC = props => {

    return (
        <div>
            <div style={{
                position: 'fixed',
                height: '100%',
                width: '100%',
                margin: '0 auto',
                top: 0,
                left: 0,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 200,
                backgroundColor: 'rgba(255, 255, 255, .5)'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <div><BarLoader color={"green"} loading={true}/></div>
                    <div style={{marginTop: '15px'}}>Processing, Please wait.</div>
                </div>
            </div>
        </div>
    )
}

export default Loader