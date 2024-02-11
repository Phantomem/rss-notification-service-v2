export type NotificationServiceType = {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  notify: (message: string) => Promise<void>
}