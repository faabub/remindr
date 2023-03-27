import RemindersList from "@/components/remindrs/RemindersList"
import RemindersPage from "@/components/remindrs/RemindersPage"

export default function Reminders({params}: any)
{
    return (
        <RemindersPage params={params}>
            {/* @ts-expect-error Server Component */}
            <RemindersList params={params}/>
        </RemindersPage>
    )
}