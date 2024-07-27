import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await prisma.user.delete({
        where: {
            email: 'jwcho1999@naver.com',
        },
    })
    res.status(200).json({ status: 'success' })
}
