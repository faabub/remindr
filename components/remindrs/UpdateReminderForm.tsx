"use client"

import styles from '@/styles/UpdateReminderForm.module.css';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function UpdateReminderForm({ params }: any) {
    const { data: session } = useSession()
    const router = useRouter();
    const [reminderTitle, setReminderTitle] = useState('');
    const [reminderDescription, setReminderDescription] = useState('');
    const [reminderDueDate, setReminderDueDate] = useState('');
    const [reminderColor, setReminderColor] = useState('#000000');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (reminderTitle && reminderDueDate) {
            const res = await fetch(`http://localhost:3000/api/reminders/${params.reminder_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: reminderTitle,
                    description: reminderDescription,
                    dueDate: new Date(reminderDueDate),
                    color: reminderColor,
                }),
            });

            if (res.ok) {
                router.back();
            }
        }
    };

    return (
        <>
            {session ? (
                <div className={styles.container}>
                    <main className={styles.main}>
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                            <label>
                                Nouveau titre du rappel
                            </label>
                            <input type="text" value={reminderTitle} onChange={(e) => setReminderTitle(e.target.value)} />
                            <label>
                                Nouvelle description
                            </label>
                            <textarea
                                value={reminderDescription}
                                onChange={(e) => setReminderDescription(e.target.value)}
                                rows={3}
                                style={{ resize: 'none' }}
                            ></textarea>
                            <label>
                                Nouvelle date d'échéance
                                <input type="date" value={reminderDueDate} onChange={(e) => setReminderDueDate(e.target.value)} />
                            </label>
                            <label>
                                Nouvelle couleur
                                <input type="color" value={reminderColor} onChange={(e) => setReminderColor(e.target.value)} />
                            </label>
                            <button type="submit">
                                Mettre à jour
                            </button>
                        </form>
                    </main>
                </div>
            ) : (
                <h1>Veuillez vous connecter pour mettre à jour le reminder.</h1>
            )}
        </>
    )
}