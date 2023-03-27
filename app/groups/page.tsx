import GroupsPage from '@/components/groups/GroupsPage'
import GroupsList from '@/components/groups/GroupsList'

export default function Groups() {
    return (
        <GroupsPage>
            {/* @ts-expect-error Server Component */}
            <GroupsList/>
        </GroupsPage>
    )
}