import { useRef, useState } from "react";
import { useInterval } from "usehooks-ts";

interface Sparkle {
    id: number,
    x: number,
    y: number,
    color: "#ca6464"|"#5f52f4"|"#985d9e",
}

interface Blur {
    id: number,
    x: number,
    y: number,
    scale: number
}

interface Flair {
    id: number,
    x: number,
    y: number,
    xShift: number,
    yShift: number
}

export default function BackgroundAnimation() {
    const[sparkles, setSparkles] = useState<Sparkle[]>([]);
    const[blurs, setBlurs] = useState<Blur[]>([]);
    const[flairs, setFlairs] = useState([])
    const sparkleID = useRef(0);
    const blurID = useRef(0);
    const[sparkleDelay, setSparkleDelay] = useState(500);
    const[blurDelay, setBlurDelay] = useState(500);

    // add a blur, remove excess old ones
    const addBlur = () => {
        blurID.current = blurID.current + 1;
        let newBlurX;
        let newBlurY;
        if (Math.round(Math.random())==0) {
            newBlurX = Math.round(Math.random()) * 96 + 2
            newBlurY = Math.random() * 100
        } else {
            newBlurX = Math.random() * 100
            newBlurY = Math.round(Math.random()) * 96 + 2
        }
        const newBlur:Blur = {
            id: blurID.current,
            x: newBlurX,
            y: newBlurY,
            scale: Math.random()*0.5 + 0.5
        }
        const newBlurs = blurs.sort((a,b) => {
            if(a.id > b.id) {
                return 1;
            } else {
                return -1;
            }
        }).slice(-8).concat([newBlur]);
        setBlurs(newBlurs);
        setBlurDelay(1000 + Math.random()*3000)
    }

    // add a sparkle, remove excess old ones
    const addSparkle = () => {
        sparkleID.current = sparkleID.current +1;
        const newColorNumber = Math.floor(Math.random() * 3)
        const newColor = (newColorNumber == 0?"#ca6464":(newColorNumber == 1?"#5f52f4":"#985d9e"));
        const newSparkle:Sparkle = {
            id: sparkleID.current, 
            x: (Math.random()*100), 
            y: (Math.random()*100), 
            color: newColor
        }
        const newSparkles = sparkles.sort((a,b) => {
            if(a.id > b.id) {
                return 1;
            } else {
                return -1;
            }
        }).slice(-15).concat([newSparkle]);
        setSparkles(newSparkles);
        setSparkleDelay(100 + Math.random()*500);
    }

    // set sparkle effects
    useInterval(() => {
        addSparkle();
    }, sparkleDelay)

    // set blur effects
    useInterval(() => {
        addBlur();
    }, blurDelay)

    return (
        <div className="bg-animation-layer"> 
            {sparkles &&
            <>
                {sparkles.map((sparkle) => {return (
                    <div className="bg-sparkle" data-key={sparkle.id} key={sparkle.id} style={{
                        left: sparkle.x + "%",
                        top: sparkle.y + "%",
                        backgroundColor: sparkle.color
                      }}/>
                )})}
            </>
            }
            {blurs &&
            <>
                {blurs.map((blur) => { return (
                    <div className="bg-circle-blur-container" key={blur.id} style={{
                        left: blur.x + "%",
                        top: blur.y + "%",
                        transform: `scale(${blur.scale})`,
                    }}>
                        <div className="bg-circle-blur"/>
                    </div>
                )})}
            </>
            }
        </div>
    )
}