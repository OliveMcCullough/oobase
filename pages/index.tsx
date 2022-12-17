import { PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout';
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
    <Layout>
      <div>
        <h1 className="text-3xl font-bold underline"> Here are some Ooblets </h1>
        { ooblets.length > 0 && 
        <ul> {ooblets.map((ooblet) => (<li key={ooblet.id}> {ooblet.name} </li>))} </ul>}
      </div>
    </Layout>
  )
}
