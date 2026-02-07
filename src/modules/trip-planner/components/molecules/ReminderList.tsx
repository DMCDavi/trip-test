import type { TripReminder } from '../../models/tripPlanner.models'

const formatDateLabel = (value?: string) => {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

type ReminderListProps = {
  reminders: TripReminder[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export const ReminderList = ({
  reminders,
  onToggle,
  onRemove,
}: ReminderListProps) => {
  if (reminders.length === 0) {
    return <p className="reminder-list__empty">No reminders yet.</p>
  }

  return (
    <ul className="reminder-list">
      {reminders.map((reminder) => (
        <li key={reminder.id} className="reminder-card">
          <label className="reminder-card__main">
            <input
              type="checkbox"
              checked={reminder.completed}
              onChange={() => onToggle(reminder.id)}
            />
            <span
              className={`reminder-card__text${
                reminder.completed ? ' reminder-card__text--done' : ''
              }`}
            >
              {reminder.text}
            </span>
          </label>
          <div className="reminder-card__meta">
            {reminder.dueDate ? (
              <span className="reminder-card__date">
                {formatDateLabel(reminder.dueDate)}
              </span>
            ) : null}
            <button
              type="button"
              className="reminder-card__remove"
              onClick={() => onRemove(reminder.id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
