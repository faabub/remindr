// @ts-nocheck

import * as ics from 'ics'
import client from '@/lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function GET(req: Request, { params }: any) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    const reminders = await client.reminder.findMany({
        where: {
            groupId: params.group_id,
        },
    });

    const events = reminders.map((reminder) => {
        return {
            title: reminder.title,
            description: reminder.description,
            start: [reminder.dueDate.getFullYear(), reminder.dueDate.getMonth() + 1, reminder.dueDate.getDate()],
        };
    });

    const { error, value } = ics.createEvents(events);
    if (error) {
        console.error(error);
        return new Response('Error creating iCal file', {
            status: 500,
        });
    } else {
        const filename = `reminders-${params.group_id}.ics`;
        const response = new Response(value, {
            status: 200
        });

        response.headers.set('Content-Type', 'text/calendar');
        response.headers.set('Content-Disposition', `attachment; filename=${filename}`);
        return response;
    }
}