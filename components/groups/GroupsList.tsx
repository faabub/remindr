// @ts-nocheck

import client from "@/lib/prismadb";
import { Group } from "@prisma/client";
import { Reminder } from "@prisma/client";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import styles from '@/styles/GroupsList.module.css'
import Link from "next/link";

type GroupProps = {
    group: Group & {
        reminders: Reminder[]
    }
}

async function fetchGroupsFromDatabase() {
    const session = await getServerSession(authOptions);

    const fetchedGroupsFromDatabase = await client?.group.findMany({
        where: {
            userGroups: {
                some: {
                    userId: session?.user?.id
                }
            }
        },
        include: {
            reminders: true,
        }
    });

    return fetchedGroupsFromDatabase;
}

export default async function GroupsList() {
    const fetchedGroups = await fetchGroupsFromDatabase();

    return (
        <div className={styles.groupList}>
            {fetchedGroups?.map((group: any) => (
                <GroupElement group={group} key={group.id} />
            ))}
        </div>
    )
}

function GroupElement({ group }: GroupProps) {
    const { id, name, createdAt, reminders, updatedAt } = group;

    const targetGroupRemindersUrl = process.env.LOCAL_GROUPS_URL + '/' + id + '/reminders';
    const targetGroupAddUserForm = process.env.LOCAL_GROUPS_URL + '/' + id + '/add_user';
    const targetGroupUpdateGroupForm = process.env.LOCAL_GROUPS_URL + '/' + id + '/update';

    return (
        <div className={styles.groupElement} key={id}>
            <Link href={targetGroupRemindersUrl}>
                <div className={styles.groupElementHeader}>
                    <h3>
                        {name}
                    </h3>
                    <div className={styles.groupActionContainer}>
                        <Link href={targetGroupAddUserForm}>+</Link>
                        <Link href={targetGroupUpdateGroupForm}>/</Link>
                    </div>
                </div>
                <p>{createdAt.toLocaleDateString()}</p>
                {reminders?.length <= 0 ? (
                    <p>Aucun rappel pour ce groupe</p>
                ) : (
                    <p>Il y a {reminders?.length} rappels pour ce groupe</p>
                )}
            </Link>
        </div>
    )
}