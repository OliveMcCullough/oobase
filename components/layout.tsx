import Head from 'next/head'

export default function Layout({ children }: { children:React.ReactNode }) {
    return (
    <div>
        <Head>
            <title>Oobase</title>
            <meta name="description" content="A site to quickly find information about specific ooblets" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            {children}
        </main>

    </div>
  )
}