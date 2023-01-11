import { useEffect, useState } from "react";

export default function OobletItemPhrasing({ itemAmount, itemName }: { itemAmount:number, itemName: string}) {
    const[itemText, setItemText] = useState<undefined | string>(undefined);

    // set hype text on mount
    useEffect(() => {
        const itemTextOptions = [
            `Hankering for ${itemAmount} ${itemName}`,
            `Finds ${itemAmount} ${itemName} delish`,
            `Will dance for ${itemAmount} ${itemName}`,
            `Fave treabie: ${itemAmount} ${itemName}`,
        ];
        const myItemText = itemTextOptions[Math.floor(Math.random()*itemTextOptions.length)];
        setItemText(myItemText);
    }, [])

    return (
        <> {itemText} </>
    )
}