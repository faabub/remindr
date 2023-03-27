"use client"

import styles from '@/styles/AddUserToGroup.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AddUserToGroupForm({ children, params }: any) {
    const [selectedUserId, setSelectedUserId] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/api/groups/${params.group_id}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: selectedUserId }),
        });
        
        if (res.ok) {
            router.back();
        }
    };

    console.log(selectedUserId)

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <label>
                        Utilisateur à ajouter
                    </label>
                    <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                        {children}
                    </select>
                    <button type="submit">
                        Ajouter au groupe
                    </button>
                </form>
            </main>
        </div>
    );
}