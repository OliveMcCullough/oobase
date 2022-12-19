import Head from 'next/head'

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
        </Head>

        <main>
            {children}
        </main>

    </div>
  )
}