import {defineStore} from "pinia";
import { v4 as uuid } from 'uuid';

type Notification = {
    id?: string,
    type?: 'info' | 'success' | 'warning' | 'destructive'
    title: string,
    description?: string,
}

export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        notifications: [] as Notification[]
    }),
    actions: {
        createNotification({type, title, description}: Notification) {
            const id = uuid()
            this.notifications.push(
                { id, type, title, description }
            )

            this.updateState(id)
        },

        updateState(id: string) {
            setTimeout(() => {
                this.notifications = this.notifications.filter(notification => notification.id !== id)
            }, 3000)
        }
    }
})