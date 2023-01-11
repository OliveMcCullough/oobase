import { useEffect, useState } from "react";



export default function BackgroundAnimation() {
    const[hypeContent, setHypeContent] = useState<undefined | string>(undefined);

    // set hype text on mount
    useEffect(() => {
        const hypeTextOptions = ["Cute!", "Ahhhh!", "Who's that?", "Oh look!", "Woah."];
        const myHypeText = hypeTextOptions[Math.floor(Math.random()*hypeTextOptions.length)];
        setHypeContent(myHypeText);
    }, [])

    return (
        <h1 className="ooblets-hype-text"> {hypeContent} </h1>
    )
}