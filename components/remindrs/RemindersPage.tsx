"use client";

import { saveAs } from 'file-saver';
import { useSession } from 'next-auth/react'
import styles from '@/styles/Groups.module.css'
import Modal from '@/components/commons/Modal'
import { useState } from 'react'
import { CreateReminderForm } from './CreateReminderForm';

export default function RemindersPage({ children, params }: any) {
    const { data: session } = useSession()
    const [showModalReminder, setShowModalReminder] = useState(false)

    const getIcalFiles = async () => {
        const res = await fetch(`http://localhost:3000/api/groups/${params.group_id}/reminders/icals`, {
            method: 'GET',
        });

        if (res.ok) {
            const blob = await res.blob();
            saveAs(blob, `reminders-${params.group_id}`);
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {session ? (
                    <>
                        <div className={styles.remindersActionContainer}>
                            <button className={styles.createButton} onClick={() => setShowModalReminder(true)}>Créer un rappel</button>
                            <button className={styles.createButton} onClick={getIcalFiles}>Exporter rappels</button>
                        </div>
                        <h1 className={styles.title}>Mes rappels</h1>
                        {children}
                        {showModalReminder && (
                            <Modal isOpen={showModalReminder} title="Nouveau rappel" onClose={() => setShowModalReminder(false)}>
                                <CreateReminderForm group_id={params.group_id} onSuccess={() => setShowModalReminder(false)} />
                            </Modal>

                        )}
                    </>
                ) : (
                    <h1>Veuillez vous connecter pour voir les rappels de ce groupe.</h1>
                )}
            </main>
        </div>
    )
}