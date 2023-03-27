// @ts-nocheck

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function POST(req: Request, { params }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response("Unauthorized", {
            status: 401
        })
    }

    const { userId } = await req.json();

    const group = await prisma.group.update({
        where: { id: params.group_id },
        data: {
            userGroups: {
                create: {
                    userId: userId
                }
            }
        },
    });
    
    return new Response({
        status: 200
    })
}