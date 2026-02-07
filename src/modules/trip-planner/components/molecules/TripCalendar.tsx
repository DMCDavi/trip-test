import { formatDateKey, formatMonthLabel, getMonthGrid } from '../../utils/date.utils'
import type { TripEvent } from '../../models/tripPlanner.models'

type TripCalendarProps = {
  currentMonth: Date
  selectedDate: string
  events: TripEvent[]
  onSelectDate: (value: string) => void
  onMonthChange: (next: Date) => void
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const TripCalendar = ({
  currentMonth,
  selectedDate,
  events,
  onSelectDate,
  onMonthChange,
}: TripCalendarProps) => {
  const grid = getMonthGrid(currentMonth)

  const eventsByDate = events.reduce<Record<string, number>>((acc, event) => {
    acc[event.date] = (acc[event.date] ?? 0) + 1
    return acc
  }, {})

  const handlePrev = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNext = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button type="button" className="calendar__nav" onClick={handlePrev}>
          Prev
        </button>
        <p className="calendar__label">{formatMonthLabel(currentMonth)}</p>
        <button type="button" className="calendar__nav" onClick={handleNext}>
          Next
        </button>
      </div>

      <div className="calendar__weekdays">
        {weekDays.map((day) => (
          <span key={day} className="calendar__weekday">
            {day}
          </span>
        ))}
      </div>

      <div className="calendar__grid">
        {grid.map((cell) => {
          const dateKey = formatDateKey(cell.date)
          const isSelected = dateKey === selectedDate
          const count = eventsByDate[dateKey] ?? 0

          return (
            <button
              key={dateKey}
              type="button"
              className={`calendar__day${
                cell.isCurrentMonth ? '' : ' calendar__day--muted'
              }${isSelected ? ' calendar__day--active' : ''}`}
              onClick={() => onSelectDate(dateKey)}
              aria-label={dateKey}
            >
              <span className="calendar__day-number">{cell.date.getDate()}</span>
              {count > 0 ? (
                <span className="calendar__event-count">{count}</span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
