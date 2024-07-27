import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const readUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    const users = await prisma.user.findMany()

    res.status(200).json({ users })
}
