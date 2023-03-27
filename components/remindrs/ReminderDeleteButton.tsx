"use client";

import styles from '@/styles/ReminderDeleteButton.module.css'
import { useRouter } from 'next/navigation';


export default function ReminderDeleteButton({ reminder_id, color }: any) {
    const router = useRouter();

    const handleDelete = async () => {

        const res = await fetch(`http://localhost:3000/api/reminders/${reminder_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (res.ok) {
            router.refresh()
        }
    }

    return (
        <button className={styles.reminderDelete} style={{color: color}}onClick={handleDelete}>
           X
        </button>
    )
}