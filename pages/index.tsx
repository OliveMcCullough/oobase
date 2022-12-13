import { PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const ooblets = await prisma.ooblet.findMany();

  return {
    props: {
      ooblets
    },
  };
}

export default function Home({ 
  ooblets
}:{ 
  ooblets: [{
    id: number,
    name: String,
    desc: String
}] 
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Oobase</title>
        <meta name="description" content="A site to quickly find information about specific ooblets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1> Here are some Ooblets </h1>
        { ooblets.length > 0 && 
        <ul> {ooblets.map((ooblet) => (<li key={ooblet.id}> {ooblet.name} </li>))} </ul>}
      </main>

    </div>
  )
}
