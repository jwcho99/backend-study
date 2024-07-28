import { PrismaClient } from '@prisma/client'
import { readUsers } from '@/apis/users/readUsers'
import { create } from 'domain'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { idx } = req.query
    const idxStr = Array.isArray(idx) ? idx[0] : idx
    if (
        !idxStr ||
        isNaN(parseInt(idxStr, 10)) ||
        parseInt(idxStr, 10).toString() !== idxStr
    ) {
        return res.status(400).json({ message: '유효하지 않은 idx입니다.' })
    }
    const postIdx = parseInt(idxStr, 10)
    if (req.method === 'GET') {
        // 특정 게시글 조회
        const post = await prisma.post.findUnique({
            where: { idx: postIdx },
        })
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
        }
    } else if (req.method === 'PUT') {
        const post = await prisma.post.update({
            where: { idx: postIdx },
            data: req.body,
        })
        if (!post) {
            res.status(404).json({ status: 'fail', message: 'Post not found' })
        } else {
            res.status(200).json({ status: 'success', idx: post.idx })
        }
    } else if (req.method === 'DELETE') {
        const post = await prisma.post.delete({
            where: {
                idx: postIdx,
            },
        })
        if (post) {
            res.status(200).json({ status: 'success', idx: post.idx })
        } else {
            res.status(404).json({ status: 'fail', message: 'Post not found' })
        }
    } else if (req.method === 'POST') {
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorIdx: req.body.authorIdx,
            },
        })
        if (post) {
            res.status(201).json({ status: 'success', idx: post.idx })
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'Internal Server Error',
            })
        }
    } else {
        res.status(405).json({ message: '지원하지 않는 메서드입니다.' })
    }
}

export default handler
