export type TripReminder = {
  id: string
  text: string
  dueDate?: string
  completed: boolean
  createdAt: number
}

export type NewTripReminder = {
  text: string
  dueDate?: string
}

export type TripEvent = {
  id: string
  title: string
  date: string
  note?: string
  createdAt: number
}

export type NewTripEvent = {
  title: string
  date: string
  note?: string
}
