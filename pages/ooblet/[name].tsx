import { PrismaClient } from '@prisma/client';
import Layout from '../../components/layout';
import OobletHypeText from '../../components/oobletHypeText';
import OobletItemPhrasing from '../../components/oobletItemPhrasing';

export async function getStaticProps({ params }: { params: {name: string} }) {
    const prisma = new PrismaClient()
    const oobletData = await prisma.ooblet.findFirst({where: 
        {name: params.name },
        select: {
            name: true,
            desc: true,
            moves: {
                select: {
                    name: true,
                    desc: true,
                    cost: true
                }
            }, 
            regions: {
                select: {
                    name: true,
                }
            }, 
            itemType: {
                select: {
                    name: true,
                }
            },
            itemAmount: true
        }
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
        desc: string,
        moves: [{
            name: string,
            desc: string,
            cost: number
        }], 
        regions: [{
            name: string,
        }], 
        itemType: {
            name: string,
        },
        itemAmount: number
    }
}) {
    // Cute! Ahhhh! Who's that? Oh look! Woah.
    // It's <Ooblet name>
    // Description

    return (
        <Layout>
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
                                <h2 className="ooblets-subheader"> It's {oobletData.name}! </h2>
                                <p className="ooblets-description"> {oobletData.desc} </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="ooblets-subheader"> Can they dance? </h2>
                        <h2 className="ooblets-subheader"> Got some moves! </h2>
                        <h2 className="ooblets-subheader"> Schmovin like: </h2>

                        <div className="ooblets-moves-display">
                            {oobletData.moves.map((move) => { return (
                                <div className="ooblets-move-card">
                                    <p> {move.cost} - {move.name} - {move.desc} </p>
                                </div>
                            )})}
                        </div>


                        <h2 className="ooblets-subheader"> 
                            <OobletItemPhrasing itemAmount={oobletData.itemAmount} itemName={oobletData.itemType.name}/> 
                        </h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}