import styles from '@/styles/CreateReminderForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CreateReminderFormProps = {
    group_id: string;
    onSuccess: () => void;
};

export function CreateReminderForm({ group_id, onSuccess }: CreateReminderFormProps) {
    const router = useRouter();
    const [reminderTitle, setReminderTitle] = useState('');
    const [reminderDescription, setReminderDescription] = useState('');
    const [reminderDueDate, setReminderDueDate] = useState('');
    const [reminderColor, setReminderColor] = useState('#000000');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (reminderTitle && reminderDueDate) {
            const res = await fetch(`http://localhost:3000/api/groups/${group_id}/reminders`, {
                method: 'POST',
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
                onSuccess();
                router.refresh();
            }
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label>
                Titre du rappel
                <input type="text" value={reminderTitle} onChange={(e) => setReminderTitle(e.target.value)} required />
            </label>
            <label>
                Description
            </label>
            <textarea
                required
                value={reminderDescription}
                onChange={(e) => setReminderDescription(e.target.value)}
                rows={3}
                style={{ resize: 'none' }}
            ></textarea>
            <label>
                Date d'échéance
                <input type="date" value={reminderDueDate} onChange={(e) => setReminderDueDate(e.target.value)} required />
            </label>
            <label>
                Couleur
                <input type="color" value={reminderColor} onChange={(e) => setReminderColor(e.target.value)} required />
            </label>
            <button type="submit">
                Créer
            </button>
        </form>
    );
}