import { readUsers } from '@/apis/users/readUsers'
import { createUser } from '@/apis/users/createUser'
import { updateUser } from '@/apis/users/updateUser'
import { deleteUser } from '@/apis/users/deleteUser'
import { create } from 'domain'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        await readUsers(req, res)
    } else if (req.method === 'POST') {
        await createUser(req, res)
    } else if (req.method === 'PUT') {
        await updateUser(req, res)
    } else if (req.method === 'DELETE') {
        await deleteUser(req, res)
    } else {
        res.status(400).json({
            message: '지원하지 않는 메서드입니다.',
        })
    }
}

export default handler
