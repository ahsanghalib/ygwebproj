import React from "react";
import classes from "./DrawerToggle.module.scss";

interface DrawerToggleProps {
    clicked: () => void;
}

function DrawerToggle(props: DrawerToggleProps) {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <svg xmlns="http://www.w3.org/2000/svg" width="175" height="145" viewBox="0 0 175 145">
                <g id="Group_242" data-name="Group 242" transform="translate(789 1193)">
                    <rect id="Rectangle_35" data-name="Rectangle 35" width="175" height="145"
                          transform="translate(-789 -1193)" fill="transparent"/>
                    <line id="Line_1" data-name="Line 1" x2="116.553" transform="translate(-760.713 -1161.5)"
                          fill="none" stroke="#f68c1e" strokeLinecap="round" strokeWidth="10"/>
                    <line id="Line_2" data-name="Line 2" x2="116.553" transform="translate(-760.713 -1121.5)"
                          fill="none" stroke="#f68c1e" strokeLinecap="round" strokeWidth="10"/>
                    <line id="Line_3" data-name="Line 3" x2="116.553" transform="translate(-760.713 -1081.5)"
                          fill="none" stroke="#f68c1e" strokeLinecap="round" strokeWidth="10"/>
                </g>
            </svg>


        </div>
    );
}

export default DrawerToggle;
