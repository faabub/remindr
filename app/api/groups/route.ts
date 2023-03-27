// @ts-nocheck

import { getServerSession } from "next-auth/next";
import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response("Unauthorized", {
            status: 401
        })
    }

    const { name } = await req.json();

    const createdGroup = await client.group.create({
        data: {
            name: name,
            userGroups: {
                create: [
                    {
                        user: {
                            connect: {
                                id: session.user.id
                            }
                        },
                    },
                ],
            },
        },
        include: {
            userGroups: true,
        },
    });

    return new Response({
        status: 200
    })
}
