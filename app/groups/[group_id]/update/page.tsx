"use client"

import styles from '@/styles/UpdateReminderForm.module.css'
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function UpdateGroupForm({ params }: any) {
    const { data: session } = useSession()
    const [groupName, setGroupName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/api/groups/${params.group_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: groupName }),
        });

        if (res.ok) {
            router.back();
            router.refresh();
        }
    }

    return (
        <>
            {session ? (
                <div className={styles.container}>
                    <main className={styles.main}>
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                            <label>
                                Nouveau nom du groupe
                            </label>
                            <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
                            <button type="submit">Mettre à jour</button>
                        </form>
                    </main>
                </div>
            ) : (
                <h1>Veuillez vous connecter pour mettre à jour le reminder.</h1>
            )}
        </>
    )

}