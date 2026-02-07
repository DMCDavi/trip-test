export const APP_NAME = 'TripTest' as const

export const CATEGORIES = [
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'cats', label: 'Cats' },
  { id: 'personal', label: 'Personal' },
  { id: 'room', label: 'Room' },
  { id: 'work', label: 'Work' },
  { id: 'laundry', label: 'Laundry' },
] as const

export const BUCKETS = [
  {
    id: 'keep',
    label: 'Keep',
    description: 'Stays with you for daily use.',
  },
  {
    id: 'give-away',
    label: 'Give Away',
    description: 'Donate or gift to someone else.',
  },
  {
    id: 'take-away',
    label: 'Take Away',
    description: 'Pack for the trip and carry along.',
  },
] as const
