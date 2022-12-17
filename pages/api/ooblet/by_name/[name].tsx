import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const oobletName = req.query.name
    if (typeof oobletName !== "string") {
        return res.status(400).json({ data: 'Item amount has not been provided correctly'})
    }
    const oobletInfo = await prisma.ooblet.findFirstOrThrow({where: {name:oobletName}});
    res.status(200).json(oobletInfo)
}