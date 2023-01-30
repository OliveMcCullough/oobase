import { PrismaClient } from '@prisma/client';
import Layout from '../../components/Layout';
import OobletsList from '../../components/OobletsList';

export async function getStaticPaths() {
    const prisma = new PrismaClient()
    const regions = await prisma.region.findMany({select: {
      name: true,
    }});
    const paths = regions.map((region) => {
        return {
            params: {
                region: region.name
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: { params: {region: string} }) {
  const prisma = new PrismaClient()
  const ooblets = await prisma.ooblet.findMany({where:{regions:{some:{name:params.region}}},
    select: {
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
