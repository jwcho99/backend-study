import { getPosts } from '@/apis/posts/getPosts'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        await getPosts(req, res)
    } else {
        res.status(400).json({
            message: '지원하지 않는 메서드입니다.',
        })
    }
}

export default handler
