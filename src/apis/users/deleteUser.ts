import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const deleteUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    userIdx: number
) => {
    const user = await prisma.user.delete({
        where: {
            idx: userIdx,
        },
    })
    if (user) {
        res.status(200).json({ status: 'success', idx: user.idx })
    } else {
        res.status(404).json({ status: 'fail', message: 'User not found' })
    }
}
