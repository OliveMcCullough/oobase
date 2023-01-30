import Link from "next/link"

export default function OobletsList (
    { ooblets }:
    { 
        ooblets:{
            id: number, 
            name: string, 
            regions:{id:number, name:string}[] 
        }[]
    }
    ) {
    return (
        <> { ooblets.length > 0 && 
            <ul className="ooblet-list"> 
                {ooblets.map((ooblet) => (
                <li key={ooblet.id} className="ooblet-card">
                    <Link href={`/ooblet/${ooblet.name}`}>
                    <div className="ooblet-card-display-container">
                        <img 
                        className="ooblet-card-display-image" 
                        alt={ooblet.name} 
                        src={`/images/ooblets/${ooblet.name}_common.png`}
                        />  
                    </div>
                    <span className="ooblet-tag common-ooblet-name-tag"> {ooblet.name}  </span>
                    </Link>
                    {ooblet.regions.length > 0 &&
                    <>{ooblet.regions.map((region) => (
                        <Link key={region.id} href={`/region/${region.name}`}>
                        <span className="ooblet-tag"> {region.name} </span>
                        </Link>
                    ))}
                    </>
                    }
                </li>))} 
            </ul>
        } </>
    )
}