import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (process.env.NODE_ENV != "production") {
        const { id } = req.query
        const body = req.body // get request data body

        if (!id) {
            return res.status(400).json({ data: 'Could not find ID' })
        }

        if(!(typeof id === "string")) {
            return res.status(400).json({ data: 'PID is not a string' })
        }

        if(isNaN(parseInt(id))) {
            return res.status(400).json({ data: 'PID is not a number' })
        }

        // verify data is correct
        // all fields are present
        if (!body.name || !body.description || !body.regions || !body.itemType || !body.itemAmount || 
            !body.moveName0 || !body.moveName1 || !body.moveName2 ||
            !body.moveDescription0 || !body.moveDescription1 || !body.moveDescription2 ||
            !body.moveCost0 || !body.moveCost1 || !body.moveCost2) {
            return res.status(400).json({ data: 'Full data for Ooblet not present' })
        }
        // item amount is a number
        if(!!isNaN(body.itemAmount)) {
            return res.status(400).json({ data: 'Item amount has not been provided correctly'})
        }
        // item amount is above 3 or under 1
        if(parseFloat(body.itemAmount) < 1 || parseFloat(body.itemAmount) > 3) {
            return res.status(400).json({ data: 'Item amount must be between 1 and 3'})
        }
        // there is not at least one region
        if(body.regions.length === 0 && typeof body.regions !== "string") {
            return res.status(400).json({ data: 'There must be at least 1 region'})
        }
        // the move costs are numbers
        if(!!isNaN(body.moveCost0) || !!isNaN(body.moveCost1) || !!isNaN(body.moveCost2)) {
            return res.status(400).json({ data: 'Move costs should be numerical'})
        }
        // the move costs are 0 or higher
        if(parseFloat(body.moveCost0) < 0 || parseFloat(body.moveCost1) < 0 || parseFloat(body.moveCost2) < 0) {
            return res.status(400).json({ data: 'Move costs should be positive'})
        }
        // the ooblet doesn't already exist
        if(await prisma.ooblet.findFirst( { where: {name:body.name, NOT: {id:parseInt(id)}} } ) !== null) {
            return res.status(400).json({ data: 'There is already an Ooblet with that name!'})
        }

        // prepare array of new regions
        let newRegions:string[]
        if(typeof body.regions === "string") {
            newRegions = [body.regions]
        } else {
            newRegions = body.regions
        }

        // remove all associated moves
        await prisma.move.deleteMany({where: {ooblet:{ id: parseInt(id) }}})

        // update ooblet
        const ooblet = await prisma.ooblet.update({
            where: { id: parseInt(id) },
            data: {
                name: body.name,
                desc: body.description,
                itemAmount: parseInt(body.itemAmount),
                regions: {
                    connectOrCreate: newRegions.map((region:string) => {
                        return {where: { name: region },
                        create: { name: region }}
                    }),
                    set: newRegions.map((region:string) => {return {"name": region}})
                },
                itemType: { update: {name: body.itemType} },
                moves: {
                    create: [
                      {
                        name: body.moveName0, 
                        desc: body.moveDescription0,
                        cost: parseInt(body.moveCost0),
                        level: 1,
                      },
                      {
                        name: body.moveName1, 
                        desc: body.moveDescription1,
                        cost: parseInt(body.moveCost1),
                        level: 3,
                      },
                      {
                        name: body.moveName2, 
                        desc: body.moveDescription2,
                        cost: parseInt(body.moveCost2),
                        level: 6,
                      }
                    ]
                }
            },
        })


        // return something to confirm action has been performed
        res.redirect("/ooblet/edit/" + id)
    }
}
  