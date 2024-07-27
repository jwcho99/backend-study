import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await prisma.user.update({
        where: {
            email: 'jwcho1999@naver.com',
        },
        data: {
            name: 'this is updated name',
        },
    })
    res.status(200).json({ status: 'success', idx: user.idx })
}
