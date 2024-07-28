import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const updateUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    userIdx: number
) => {
    const user = await prisma.user.update({
        where: { idx: userIdx },
        data: {
            email: req.body.email,
            name: req.body.name,
            nickname: req.body.nickname,
        },
    })
    if (!user) {
        res.status(404).json({ status: 'fail', message: 'User not found' })
    } else {
        res.status(200).json({ status: 'success', idx: user.idx })
    }
}
