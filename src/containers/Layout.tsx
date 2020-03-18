import React from "react";
import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer'

interface LayoutProps {
    showFooter: boolean
    showHeader: boolean
    showFooterMap: boolean
}

const Layout: React.FC<LayoutProps> = props => {
    return (
        <div>
            {props.showHeader ? <Header/> : null}
            {props.children}
            {props.showFooter ? <Footer showMap={props.showFooterMap}/> : null }
        </div>
    );
}

export default Layout

