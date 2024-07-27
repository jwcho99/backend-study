import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

interface ISuccessResponse {
    posts: any
}
export const getPosts = async (
    req: NextApiRequest,
    res: NextApiResponse<ISuccessResponse>
) => {
    const posts = await prisma.post.findMany({
        include: { author: { select: { name: true, nickname: true } } },
    })
    console.log('🚀 ~ handler ~ posts :', posts)
    res.status(200).json({ posts })
}
