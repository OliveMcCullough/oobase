import { PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import OobletsList from '../components/oobletsList';

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const ooblets = await prisma.ooblet.findMany({select: {
    id: true,
    name: true,
    desc: true,
    regions: {
      select: {
          name: true,
      }
    }
  }});

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
    name: string,
    desc: string,
    regions: [{
      id: number,
      name: string
    }]
}] 
}) {
  return (
    <Layout>
      <div>
        <div className="ooblets-style container flex flex-col h-screen">
          <div>
            <h1 className="ooblets-title"> Welcome to Oobase! </h1>
            <h2 className="ooblets-subtitle"> These ooblets can be found in Oob:</h2>
          </div>
          <OobletsList ooblets={ooblets}/>
          <p className="ooblets-info"> WIP - Site by <a href="https://github.com/OliveMcCullough/">Olive McCullough</a> - <a href="https://ooblets.com/">Ooblets</a> and its characters by Glumberland - Fonts <a href="https://www.ffonts.net/Franxurter-Totally-Fat.font">Franxurter Totally Fat</a> and <a href="https://www.fontfabric.com/fonts/multicolore/">Multicolore</a> (not my own) </p>
        </div>
      </div>
    </Layout>
  )
}
