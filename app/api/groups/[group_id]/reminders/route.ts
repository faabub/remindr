// @ts-nocheck

import { getServerSession } from "next-auth/next";
import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function POST(req: Request, { params }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response("Unauthorized", {
            status: 401
        })
    }

    const { title, dueDate, description, color } = await req.json();

    const reminder = await client.reminder.create({
        data: {
            title,
            dueDate,
            description,
            color,
            group: {
                connect: {
                    id: params.group_id
                }
            }
        }
    })

    return new Response({
        status: 200
    })
}