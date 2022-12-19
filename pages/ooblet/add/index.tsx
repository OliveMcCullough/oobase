import Layout from "../../../components/layout";
import Creatable, { useCreatable } from 'react-select/creatable';
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";


type OptionType = {
    value: string;
    label: string;
}

export const getServerSideProps:GetServerSideProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        }
    }

    const prisma = new PrismaClient()
    const regions = await prisma.region.findMany()
    const regionOptions:OptionType[] = regions.map((region) => ({value: region.name +"", label: region.name}))

    return {
        props : { regionOptions }
    }
}

export default function AddOobletPage ({regionOptions} : {regionOptions:OptionType[]}) {
    return (
        <Layout> 
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4 m-auto w-4/5">
                <h1 className="text-3xl font-bold text-center"> Add a new Ooblet </h1>
                <form action="/api/ooblet/add/form" method="post">
                    <label htmlFor="name" className="form-label"> Name: </label>
                    <input type="text" id="name" name="name" className="form-input" required/>

                    <label htmlFor="description" className="form-label"> Description: </label>
                    <textarea id="description" name="description" className="form-input" required/>

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
                    />

                    <label htmlFor="itemType" className="form-label"> Item type: </label>
                    <input type="text" id="itemType" name="itemType" className="form-input" required/>

                    <label htmlFor="itemAmount" className="form-label"> Item amount: </label> 
                    <input type="number" id="itemAmount" name="itemAmount" className="form-input" min="1" max="4" required/>

                    {[...Array(3)].map((x, i) =>
                        <fieldset key={i} className="form-fieldset"> 
                            <legend className="form-fieldset-legend"> Move n°{i+1} (level {(i+1)/2*(i+2)})</legend>
                            <label htmlFor={`moveName${i}`} className="form-label">Name:</label>
                            <input type="text" id={`moveName${i}`} name={`moveName${i}`} className="form-input" required/>

                            <label htmlFor={`moveDescription${i}`} className="form-label">Description:</label>
                            <textarea id={`moveDescription${i}`} name={`moveDescription${i}`} className="form-input" required/>

                            <label htmlFor={`moveCost${i}`} className="form-label">Cost:</label>
                            <input type="number" min="0" id={`moveCost${i}`} name={`moveCost${i}`} className="form-input" required/>
                        </fieldset>
                    )}

                    <button type="submit" className="form-button"> I Know It </button>
                </form>
            </div>
        </Layout>
    )
}