import React from "react";
import classes from "./Header.module.scss";
import {Link} from "react-router-dom";
import Navigation from "../Navigation";
import MainLogo from "../MainLogo";
import SocialMediaIcon from "../SocialMediaIcon";

function Header() {

    return (
        <div className={classes.Header}>
            <div className={classes.HeaderContainer}>
                <Link to="/" className={classes.MainLogo}>
                    <div>
                        <MainLogo type={"color"}/>
                    </div>
                </Link>
                <div className={classes.SocialMediaIcons}>
                    <SocialMediaIcon iconSize={"25"}/>
                </div>
                <Navigation/>
            </div>
        </div>
    );
}

export default Header;
