import { readUsers } from '@/apis/users/readUsers'
import { createUser } from '@/apis/users/createUser'
import { updateUser } from '@/apis/users/updateUser'
import { deleteUser } from '@/apis/users/deleteUser'
import { create } from 'domain'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            await readUsers(req, res)
        } else {
            res.status(400).json({
                message: '지원하지 않는 메서드입니다.',
            })
        }
    } catch (error) {
        console.error('API 처리 중 오류 발생:', error)
        res.status(500).json({
            message: '서버 오류가 발생했습니다.',
        })
    }
}

export default handler
