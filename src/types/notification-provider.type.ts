export type NotificationProviderType = {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  notify: (messages: string[]) => Promise<void>
}