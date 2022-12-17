import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const oobletList = await prisma.ooblet.findMany();
    const oobletNameAndDescriptionList = oobletList.map((ooblet) => { return {"name": ooblet.name, "description": ooblet.desc} })
    res.status(200).json({ooblets: oobletNameAndDescriptionList})
}