import React from 'react';
import Image from './Image'
import {ASSETS_URL} from '../helpers'

const ygLogoColor = ASSETS_URL + "/logos/yg-logo-color.png";
const ygLogoWhite = ASSETS_URL + "/logos/yg-logo-white.png";

interface MainLogoProps {
    type: 'color' | 'white';
}


function MainLogo(props: MainLogoProps) {
    return (
        props.type === 'color' ? (
                <Image
                    src={ygLogoColor}
                    alt={"Yaqoob Group of Companies"}

                />
            )
            : (
                <Image
                    src={ygLogoWhite}
                    alt={"Yaqoob Group of Companies"}
                />
            )

    )

}

export default MainLogo