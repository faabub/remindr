import { useState } from 'react'
import styles from '@/styles/Modal.module.css'

type ModalProps = {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  const [modalState, setModalState] = useState(isOpen)

  const closeModal = () => {
    setModalState(false)
    onClose()
  }

  return modalState ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.modalClose} onClick={closeModal}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  ) : null
}