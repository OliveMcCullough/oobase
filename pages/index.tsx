import { PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';
import Layout from '../components/layout';

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
    <div>
      <div> </div>
      <div className="ooblets-style container">
        <h1 className="ooblets-title"> Welcome to Oobase! </h1>
        <h2 className="ooblets-subtitle"> These ooblets can be found in Oob:</h2>
        { ooblets.length > 0 && 
        <ul className="ooblet-list"> 
          {ooblets.map((ooblet) => (
            <li key={ooblet.id} className="ooblet-card">
              <a>
                <div className="ooblet-card-display-container"> <img className="ooblet-card-display-image" alt={ooblet.name} src={`/images/ooblets/${ooblet.name}_common.png`}/>  </div>
                <span className="ooblet-tag common-ooblet-name-tag"> {ooblet.name}  </span>
              </a>
              {ooblet.regions.length > 0 &&
                <a>
                  {ooblet.regions.map((region) => (
                    <span key={region.id} className="ooblet-tag"> {region.name} </span>
                  ))}
                </a>
              }
            </li>))} 
        </ul>}
      </div>
    </div>
  )
}
