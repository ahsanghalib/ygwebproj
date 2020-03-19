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
        <div style={{position: 'relative', minHeight: '100vh'}}>
            {props.showHeader ? <Header/> : null}
            {props.children}
            <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
                <Footer showMap={props.showFooterMap} showContent={props.showFooter}/>
            </div>
        </div>
    );
}

export default Layout

