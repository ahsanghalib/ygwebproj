import React from "react";
import {NavItems} from "../Navbar/Navbar";
import Backdrop from "../Backdrop";
import classes from './SideDrawer.module.scss';

interface SideDrawerProps {
    open: boolean;
    closed: () => void;
}

function SideDrawer(props: SideDrawerProps) {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(" ")} onClick={props.closed}>
                <NavItems/>
            </div>
        </div>
    );
}

export default SideDrawer;
