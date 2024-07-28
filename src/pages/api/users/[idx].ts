import { PrismaClient } from '@prisma/client'
import { readUsers } from '@/apis/users/readUsers'
import { createUser } from '@/apis/users/createUser'
import { updateUser } from '@/apis/users/updateUser'
import { deleteUser } from '@/apis/users/deleteUser'
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
    const userIdx = parseInt(idxStr, 10)
    if (req.method === 'GET') {
        // 특정 사용자 조회
        const user = await prisma.user.findUnique({
            where: { idx: userIdx },
        })
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: '사용자를 찾을 수 없습니다.' })
        }
    } else if (req.method === 'PUT') {
        updateUser(req, res, userIdx)
    } else if (req.method === 'DELETE') {
        deleteUser(req, res, userIdx)
    } else if (req.method === 'POST') {
        createUser(req, res, userIdx)
    } else {
        res.status(405).json({ message: '지원하지 않는 메서드입니다.' })
    }
}

export default handler
