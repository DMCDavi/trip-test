import { create } from 'zustand'

import type {
  NewTripEvent,
  NewTripReminder,
  TripEvent,
  TripReminder,
} from '../models/tripPlanner.models'

const STORAGE_KEY = 'trip-test:trip-planner'

const createId = (prefix: string) => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const createReminder = (input: NewTripReminder): TripReminder => ({
  id: createId('reminder'),
  text: input.text,
  dueDate: input.dueDate,
  completed: false,
  createdAt: Date.now(),
})

const createEvent = (input: NewTripEvent): TripEvent => ({
  id: createId('event'),
  title: input.title,
  date: input.date,
  note: input.note,
  createdAt: Date.now(),
})

type StoredState = {
  reminders: TripReminder[]
  events: TripEvent[]
}

const loadState = (): StoredState => {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY)
    if (!raw) return { reminders: [], events: [] }
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return { reminders: [], events: [] }
    return {
      reminders: Array.isArray(parsed.reminders) ? parsed.reminders : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
    }
  } catch {
    return { reminders: [], events: [] }
  }
}

const persistState = (state: StoredState) => {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore persistence failures
  }
}

type TripPlannerState = StoredState & {
  addReminder: (input: NewTripReminder) => TripReminder
  toggleReminder: (id: string) => void
  removeReminder: (id: string) => void
  addEvent: (input: NewTripEvent) => TripEvent
  removeEvent: (id: string) => void
  reset: () => void
}

const initialState: StoredState = loadState()

export const useTripPlannerStore = create<TripPlannerState>((set) => ({
  ...initialState,
  addReminder: (input) => {
    const reminder = createReminder(input)
    set((state) => {
      const reminders = [reminder, ...state.reminders]
      const next = { reminders, events: state.events }
      persistState(next)
      return next
    })
    return reminder
  },
  toggleReminder: (id) => {
    set((state) => {
      const reminders = state.reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
      const next = { reminders, events: state.events }
      persistState(next)
      return next
    })
  },
  removeReminder: (id) => {
    set((state) => {
      const reminders = state.reminders.filter((reminder) => reminder.id !== id)
      const next = { reminders, events: state.events }
      persistState(next)
      return next
    })
  },
  addEvent: (input) => {
    const event = createEvent(input)
    set((state) => {
      const events = [event, ...state.events]
      const next = { reminders: state.reminders, events }
      persistState(next)
      return next
    })
    return event
  },
  removeEvent: (id) => {
    set((state) => {
      const events = state.events.filter((event) => event.id !== id)
      const next = { reminders: state.reminders, events }
      persistState(next)
      return next
    })
  },
  reset: () => {
    const next = { reminders: [], events: [] }
    set(next)
    persistState(next)
  },
}))
