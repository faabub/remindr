import nodemailer from 'nodemailer';
import cron from 'node-cron';
import client from '@/lib/prismadb';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testreminderuca@gmail.com',
        pass: 'bouteilledo123$'
    }
});

async function sendReminderEmails() {
    const reminders = await client.reminder.findMany({
        where: {
            dueDate: {
                lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Due date is less than or equal to 1 week from now
            }
        },
        include: {
            group: {
                include: {
                    userGroups: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        }
    });

    for (const reminder of reminders) {
        const { group } = reminder;
        const users = group.userGroups.map((userGroup) => userGroup.user);

        for (const user of users) {
            const mailOptions = {
                from: 'testreminderuca@gmail.com',
                to: user.email,
                subject: `Rappel: ${reminder.title} doit être effectué`,
                text: `Hello ${user.name},\n\nThis is a friendly reminder that the following reminder is due in 1 week:\n\nTitle: ${reminder.title}\nDescription: ${reminder.description}\nDue Date: ${reminder.dueDate}\n\nBest regards,\nYour Reminder App`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Email sent to ${user.email}: ${info.response}`);
                }
            });
        }
    }
}

cron.schedule('* * * * *', () => {
    sendReminderEmails().catch((error) => {
        console.error(error);
    });
});