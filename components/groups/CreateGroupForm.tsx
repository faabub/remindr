import styles from '@/styles/CreateGroupForm.module.css'
import { useState } from 'react';

type CreateGroupFormProps = {
    onSuccess: () => void
}

export function CreateGroupForm({ onSuccess }: CreateGroupFormProps) {
    const [groupName, setGroupName] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/api/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: groupName }),
        });
        
        if (res.ok) {
            onSuccess();
        }
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label>
                Nom du groupe
            </label>
            <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} required/>
            <button type="submit">Créer</button>
        </form>
    )
}