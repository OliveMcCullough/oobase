import { useEffect, useState } from "react";

export default function OobletMoveImage() {
    const[moveThemeNumber, setMoveThemeNumber] = useState<undefined | number>(undefined);

    const moveThemeAmount = 12

    // set hype text on mount
    useEffect(() => {
        const myMoveNumber = Math.floor(Math.random()*moveThemeAmount) + 1;
        setMoveThemeNumber(myMoveNumber);
    }, [])

    return (
        <div className={`ooblets-move-card-image move-theme-${moveThemeNumber}`}></div>
    )
}