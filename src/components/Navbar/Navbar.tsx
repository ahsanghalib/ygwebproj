import React from "react";
import classes from "./Navbar.module.scss";
import {NavLink} from "react-router-dom";
import DrawerToggle from "../DrawerToggle/DrawerToggle";

interface NavbarProps {
    drawToggleClicked: () => void;
}

export function Navbar(props: NavbarProps) {
    return (
        <div className={classes.Navbar}>
            <DrawerToggle clicked={props.drawToggleClicked}/>
            <nav className={classes.DesktopOnly}>
                <NavItems/>
            </nav>
        </div>
    );
}

export function NavItems() {
    return (
        <ul className={classes.NavItems}>
            <NavItem link="/" title="Home"/>
            <NavItem link="/career" title="Careers"/>
            <NavItem link="/contact" title="Contact"/>
            <NavItem link="/portals" title="Web Portals"/>
        </ul>
    );
}

interface NavItemProps {
    link: string;
    title: string;
}

function NavItem(props: NavItemProps) {
    return (
        <li className={classes.NavItem}>
            <NavLink to={props.link} exact activeClassName={classes.active}>{props.title}</NavLink>
        </li>
    );
}
