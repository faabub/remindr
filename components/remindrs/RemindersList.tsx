// @ts-nocheck

import client from "@/lib/prismadb";
import styles from '@/styles/RemindersList.module.css'
import Link from "next/link";
import ReminderDeleteButton from "./ReminderDeleteButton";

async function fetchRemindersFromDatabase(group_id) {
    const fetchedRemindersFromDatabase = await client?.reminder.findMany({
        where: {
            groupId: group_id
        },
    });


    return fetchedRemindersFromDatabase;
}

export default async function RemindersList({ params }) {
    const fetchedReminders = await fetchRemindersFromDatabase(params?.group_id);

    return (
        <div className={styles.groupList}>
            {fetchedReminders?.map((reminder) => (
                <ReminderElement group_id={params?.group_id} reminder={reminder} key={reminder.id} />
            ))}
        </div>
    )
}

function ReminderElement({ reminder, group_id }) {
    const { id, title, description, dueDate, color, photoUrl } = reminder;

    const reminderDynColorStyle = {
        groupElement: {
            border: '1px solid ' + color,
            color: color,
        },
    };

    const reminderUpdateUrl = process.env.LOCAL_GROUPS_URL + '/' + group_id + '/reminders/' + id + '/update';

    return (
        <div className={styles.groupElement} style={reminderDynColorStyle.groupElement} key={id}>
            <div className={styles.groupElementHeader}>
                <h3>
                    {title}
                </h3>
                <p>Échéance : {dueDate.toLocaleDateString()}</p>
                <div className={styles.reminderActionContainer}>
                    <ReminderDeleteButton color={color}  reminder_id={id}></ReminderDeleteButton>
                    <Link className={styles.updateReminderButton} href={reminderUpdateUrl}>/</Link>
                </div>
            </div>
            <p>{description}</p>
        </div >
    )
}