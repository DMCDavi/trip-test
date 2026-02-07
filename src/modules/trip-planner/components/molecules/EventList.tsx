import type { TripEvent } from '../../models/tripPlanner.models'

const formatDateLabel = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

type EventListProps = {
  events: TripEvent[]
  onRemove: (id: string) => void
}

export const EventList = ({ events, onRemove }: EventListProps) => {
  if (events.length === 0) {
    return <p className="event-list__empty">No events yet.</p>
  }

  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id} className="event-card">
          <div>
            <p className="event-card__title">{event.title}</p>
            <p className="event-card__date">{formatDateLabel(event.date)}</p>
            {event.note ? (
              <p className="event-card__note">{event.note}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="event-card__remove"
            onClick={() => onRemove(event.id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}
