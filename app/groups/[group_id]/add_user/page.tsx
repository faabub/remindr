import { AddUserToGroupForm } from '@/components/users/AddUserToGroupForm';
import UsersList from '@/components/users/UsersList';
import styles from '@/styles/CreateReminderForm.module.css';

export default function AddUserPage({params}: any) {
    return (
        <AddUserToGroupForm params={params}>
            {/* @ts-expect-error Server Component */}
            <UsersList/>
        </AddUserToGroupForm>
    )
}