import Creatable, { useCreatable } from 'react-select/creatable';
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import Layout from '../../../components/Layout';


type OptionType = {
    value: string;
    label: string;
}

type OobletData = {
    id: number;
    name: string;
    desc: string;
    itemAmount: number;
    itemType: {
        id: number;
        name: string;
    },
    regions: [{
        id: number;
        name: string;
    }],
    moves: [{
        id: number;
        name: string;
        desc: string;
        cost: number;
        level: number;
    }]
}

export const getServerSideProps:GetServerSideProps = async ({ params }) => {

    const redirect = {
        redirect: {
            permanent: false,
            destination: "/",
        },
    }
    if (process.env.NODE_ENV === "production") {
        return redirect;
    }

    const prisma = new PrismaClient()
    const regions = await prisma.region.findMany()
    const regionOptions:OptionType[] = regions.map((region) => ({value: region.name +"", label: region.name}))

    if(typeof params?.id === "string") {
        if(!isNaN(parseInt(params?.id))) {
            const oobletData = await prisma.ooblet.findFirst(
                {where: {id:parseInt(params?.id)}, 
                    select: {
                        name: true,
                        desc: true,
                        regions: true,
                        itemType: true,
                        moves: {
                            orderBy: {
                                level: 'asc'
                            }
                        },
                        itemAmount: true
                    }
                }
            )

            const oobletID=params?.id

            return {
                props : { 
                    regionOptions,
                    oobletData,
                    oobletID
                }
            }
        }
    }

    return redirect;
}

export default function EditOobletPage ({regionOptions, oobletData, oobletID} : {regionOptions:OptionType[], oobletData:OobletData, oobletID:number}) {
    return (
        <Layout> 
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4 m-auto w-4/5">
                <h1 className="text-3xl font-bold text-center"> Edit {oobletData.name} </h1>
                <form action={"/api/ooblet/edit/" + oobletID} method="post">
                    <label htmlFor="name" className="form-label"> Name: </label>
                    <input type="text" id="name" name="name" className="form-input" defaultValue={oobletData.name} required/>

                    <label htmlFor="description" className="form-label"> Description: </label>
                    <textarea id="description" name="description" className="form-input"  defaultValue={oobletData.desc} required/>

                    <label htmlFor="regions" className="form-label"> Region: </label>
                    <Creatable 
                        required
                        inputId="regions" 
                        name="regions" 
                        options={regionOptions} 
                        isMulti={true}
                        classNames={{
                            control: (state) =>
                                `form-input ${state.isFocused?'form-input-focus':''}`,
                            menu: (state) =>
                                'react-select-menu',
                            option: (state) =>
                                `react-select-option ${state.isFocused? 'react-select-option-selected':''}`,
                            noOptionsMessage: (state) =>
                                'react-select-no-option',
                            multiValue: (state) =>
                                'react-select-value',
                            multiValueLabel: (state) =>
                                'react-select-value-label',
                            multiValueRemove: (state) =>
                                'react-select-value-remove',
                        }}
                        unstyled={true}
                        defaultValue={oobletData.regions.map((region) => ({value: region.name, label: region.name}))}
                    />

                    <label htmlFor="itemType" className="form-label"> Item type: </label>
                    <input type="text" id="itemType" name="itemType" className="form-input" defaultValue={oobletData.itemType.name} required/>

                    <label htmlFor="itemAmount" className="form-label"> Item amount: </label> 
                    <input type="number" id="itemAmount" name="itemAmount" className="form-input" min="1" max="4" defaultValue={oobletData.itemAmount} required/>

                    {[...Array(3)].map((x, i) =>
                        <fieldset key={i} className="form-fieldset"> 
                            <legend className="form-fieldset-legend"> Move n°{i+1} (level {(i+1)/2*(i+2)})</legend>
                            <label htmlFor={`moveName${i}`} className="form-label">Name:</label>
                            <input type="text" id={`moveName${i}`} name={`moveName${i}`} className="form-input" defaultValue={(oobletData.moves[i]?oobletData.moves[i].name:"")} required/>

                            <label htmlFor={`moveDescription${i}`} className="form-label">Description:</label>
                            <textarea id={`moveDescription${i}`} name={`moveDescription${i}`} className="form-input" defaultValue={(oobletData.moves[i]?oobletData.moves[i].desc:"")} required/>

                            <label htmlFor={`moveCost${i}`} className="form-label">Cost:</label>
                            <input type="number" min="0" id={`moveCost${i}`} name={`moveCost${i}`} className="form-input" defaultValue={(oobletData.moves[i]?oobletData.moves[i].cost:"")} required/>
                        </fieldset>
                    )}

                    <button type="submit" className="form-button"> I Know It </button>
                </form>
            </div>
        </Layout>
    )
}