import Head from 'next/head'
import BackgroundAnimation from './backgroundAnimation'

export default function Layout({ children }: { children:React.ReactNode }) {
    return (
    <div>
        <Head>
            <title>Oobase</title>
            <meta name="description" content="A site to quickly find information about specific ooblets" />
            <link rel="icon" href="/favicon.ico" />
            <link
                rel="preload"
                href="/fonts/FranxurterTotallyMedium.woff2"
                as="font"
                crossOrigin=""
                type="font/woff2"
            />
            <link
                rel="preload"
                href="/fonts/FranxurterTotallyFat.woff2"
                as="font"
                crossOrigin=""
                type="font/woff2"
            />
            <link
                rel="preload"
                href="/fonts/Multicolore.woff2"
                as="font"
                crossOrigin=""
                type="font/woff2"
            />
        </Head>

        <main>
            <svg height="0" width="0">
                <defs>
                <clipPath id="sparkle-clip" clipPathUnits="objectBoundingBox">
                    <path fill="#FFFFFF" stroke="#000000" strokeWidth="1.5794" d="m 0.84661546,0.54019067 c 0,0 0.0896287,-0.0572074 -0.001927,-0.0991638 L 0.67492599,0.34758419 0.53762494,0.03674382 c 0,0 -0.0285972,-0.08390765 -0.0781876,0.0018759 L 0.33602081,0.35410534 0.15920987,0.45981331 c 0,0 -0.08963069,0.0572074 0.00191,0.0991638 l 0.1697584,0.0934427 0.13730405,0.31083838 c 0,0 0.0285962,0.0839086 0.0781886,-0.001876 l 0.12340851,-0.3154856 z"/>
                </clipPath>
                </defs>
            </svg>
            <BackgroundAnimation/>
            {children}
        </main>

    </div>
  )
}