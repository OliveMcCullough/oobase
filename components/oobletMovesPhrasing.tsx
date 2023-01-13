import { useEffect, useState } from "react";

export default function OobletMovesPhrasing() {
    const[movesText, setMovesText] = useState<undefined | string>(undefined);

    // set hype text on mount
    useEffect(() => {
        const movesTextOptions = [
            `Can they dance?`,
            `Got some moves!`,
            `Schmovin like:`,
        ];
        const mymovesText = movesTextOptions[Math.floor(Math.random()*movesTextOptions.length)];
        setMovesText(mymovesText);
    }, [])

    return (
        <> {movesText} </>
    )
}