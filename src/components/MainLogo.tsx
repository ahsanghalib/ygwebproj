import React from 'react';
import ygLogoColor from "../assets/logos/yg-logo-color.svg";
import ygLogoWhite from "../assets/logos/yg-logo-white.svg";
import Image from './Image'

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