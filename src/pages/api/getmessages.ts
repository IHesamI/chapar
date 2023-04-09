// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
type body = {
    username: string,
    user: string
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // console.log(req.body.username)
    let body = JSON.parse(req.body)
    if (body.user == null) { 
        res.status(400).json({ name: 'John Doe'})
    }
    else{
        const prisma =new PrismaClient();
        // prisma.chat.findMany()

    }

}
