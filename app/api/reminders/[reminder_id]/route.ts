// @ts-nocheck

import { getServerSession } from "next-auth/next";
import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function DELETE(req: Request, { params }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response("Unauthorized", {
            status: 401
        })
    }

    const deletedReminder = await client.reminder.delete({
        where: {
            id: params.reminder_id
        }
    });


    return new Response({
        status: 200
    })
}
