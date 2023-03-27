"use client";

import { useSession } from 'next-auth/react'
import styles from '@/styles/Groups.module.css'
import { CreateGroupForm } from './CreateGroupForm';
import Modal from '@/components/commons/Modal'
import { useState } from 'react'


export default function GroupsPage({ children }: any) {
    const { data: session } = useSession()
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {session ? (
                    <>
                        <button className={styles.createButton} onClick={() => setShowModal(true)}>Créer un groupe</button>
                        <h1 className={styles.title}>Mes groupes</h1>
                        {children}
                        {showModal && (
                            <Modal isOpen={showModal} title="Nouveau groupe" onClose={() => setShowModal(false)}>
                                <CreateGroupForm onSuccess={() => setShowModal(false)} />
                            </Modal>

                        )}
                    </>
                ) : (
                    <h1>Veuillez vous connecter pour voir vos groupes.</h1>
                )}
            </main>
        </div>
    )
}