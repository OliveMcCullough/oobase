import { PrismaClient } from '@prisma/client';
import Layout from '../../components/Layout';
import OobletHypeText from '../../components/OobletHypeText';
import OobletItemPhrasing from '../../components/OobletItemPhrasing';
import OobletMoveImage from '../../components/OobletMoveImage';
import OobletMovesPhrasing from '../../components/OobletMovesPhrasing';

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
                    cost: true,
                    level: true
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
            cost: number,
            level: number
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
                        <h2 className="ooblets-subheader"> <OobletMovesPhrasing/> </h2>

                        <div className="ooblets-moves-display">
                            {oobletData.moves.sort((a,b) => {
                                if ( a.level < b.level ){
                                return -1;
                                }
                                if ( a.level > b.level ){
                                return 1;
                                }
                                return 0;
                            })
                            .map((move) => { return (
                                <div className="ooblets-move-card">
                                    <div className="ooblets-move-card-inner"> 
                                        <div className="ooblets-move-card-cost-container"> <span>{move.cost}</span> </div> 
                                        <div className="ooblets-move-card-content-container"> 
                                            <div className="ooblets-move-card-content">
                                                <OobletMoveImage/>
                                                <div className="ooblets-move-card-info">
                                                    <div className="ooblets-move-card-title"> <span>{move.name}</span> </div>
                                                    <div className="ooblets-move-card-description"> <span>{move.desc}</span> </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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