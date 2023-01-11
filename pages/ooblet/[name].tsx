import { PrismaClient } from '@prisma/client';
import Layout from '../../components/layout';
import OobletHypeText from '../../components/oobletHypeText';

export async function getStaticProps({ params }: { params: {name: string} }) {
    const prisma = new PrismaClient()
    const oobletData = await prisma.ooblet.findFirst({where: 
        {name: params.name }
    })

    return {
        props: {
          oobletData,
        },
    };
}
  

export async function getStaticPaths() {
    const prisma = new PrismaClient()
    const ooblets = await prisma.ooblet.findMany({select: {
      name: true,
    }});
    const paths = ooblets.map((ooblet) => {
        return {
            params: {
                name: ooblet.name
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export default function OobletInfo({
    oobletData
}: {
    oobletData: {
        name: string,
        desc: string
    }
}) {
    // Cute! Ahhhh! Who's that? Oh look! Woah.
    // It's <Ooblet name>
    // Description

    return (<Layout>
        <div> 
            <div className="ooblets-style container flex flex-col h-screen">
                <div> 
                    <OobletHypeText/>
                    <div className="ooblets-presentation-display">
                        <div className="ooblets-presentation-illustration-container">
                            <img 
                                className="ooblets-presentation-illustration"
                                alt={oobletData.name} 
                                src={`/images/ooblets/${oobletData.name}_common.png`}
                            /> 
                        </div>
                        <div className="ooblets-presentation-text-section">
                            <h2 className="ooblets-intro-title ooblets-subtitle"> It's {oobletData.name}! </h2>
                            <p className="ooblets-intro-description"> {oobletData.desc} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>)
}