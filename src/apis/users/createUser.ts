import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const createUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    userIdx: number
) => {
    const users = await prisma.user.create({
        data: {
            idx: userIdx,
            email: req.body.email,
            name: req.body.name,
            nickname: req.body.nickname,
        },
    })
    res.status(200).json({ status: 'success', idx: users.idx })
}
