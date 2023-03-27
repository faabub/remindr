// @ts-nocheck

import client from "@/lib/prismadb";
import styles from '@/styles/RemindersList.module.css'

async function fetchUsersFromDatabase() {

    const fetchedUsersFromDatabase = await client?.user.findMany();

    return fetchedUsersFromDatabase;
}

export default async function UsersList() {
    const fetchedUsers = await fetchUsersFromDatabase();

    return (
        <>
            <option value="">Sélectionner un utilisateur</option>
            {fetchedUsers?.map((user) => (
                <UserElement user={user} key={user.id}/>
            ))}
        </>
    )
}

function UserElement({ user }) {
    const { id, name } = user;

    return (
        <option key={id} value={id}>
            {name}
        </option >
    )
}