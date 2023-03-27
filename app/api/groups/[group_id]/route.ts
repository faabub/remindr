// @ts-nocheck

import { getServerSession } from "next-auth/next";
import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function PATCH(req: Request, { params }) {
    console.log(params);

    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response("Unauthorized", {
            status: 401
        })
    }

    const { name } = await req.json();

    const updatedGroup = await client.group.update({
        where: {
            id: params.group_id
        },
        data: {
            name
        }
    });

    return new Response({
        status: 200
    })
}