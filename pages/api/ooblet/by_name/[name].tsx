import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const oobletName = req.query.name
    if (typeof oobletName !== "string") {
        return res.status(400).json({ data: 'Error: no name found'})
    }
    const oobletInfo = await prisma.ooblet.findFirst(
        {where: 
            {name: oobletName },
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
        }
    );
    if (oobletInfo === null) {
        return res.status(400).json({ data: 'No ooblets were found with this name'})
    }
    
    res.status(200).json(oobletInfo)
}