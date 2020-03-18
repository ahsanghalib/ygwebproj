import React, {useState} from 'react';
import SideDrawer from './SideDrawer/SideDrawer'
import {Navbar} from './Navbar/Navbar'

function Navigation() {
    const [showSideDrawer, setSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawer(!showSideDrawer);
    };
    return (
        <React.Fragment>
            <Navbar drawToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer}/>
        </React.Fragment>
    )
}

export default Navigation;