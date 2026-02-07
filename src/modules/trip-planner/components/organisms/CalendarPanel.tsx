import { useMemo, useState } from 'react'

import { useTripPlannerStore } from '../../stores/tripPlanner.store'
import { EventForm } from '../molecules/EventForm'
import { EventList } from '../molecules/EventList'
import { TripCalendar } from '../molecules/TripCalendar'
import { formatDateKey, parseDateKey } from '../../utils/date.utils'

const defaultDate = () => new Date()

type CalendarPanelProps = {
  initialDate?: Date
}

export const CalendarPanel = ({ initialDate }: CalendarPanelProps) => {
  const events = useTripPlannerStore((state) => state.events)
  const addEvent = useTripPlannerStore((state) => state.addEvent)
  const removeEvent = useTripPlannerStore((state) => state.removeEvent)

  const baseDate = initialDate ?? defaultDate()
  const [currentMonth, setCurrentMonth] = useState(
    new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)
  )
  const [selectedDate, setSelectedDate] = useState(formatDateKey(baseDate))

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, typeof events>>((acc, event) => {
      acc[event.date] = acc[event.date] ? [...acc[event.date], event] : [event]
      return acc
    }, {})
  }, [events])

  const selectedEvents = eventsByDate[selectedDate] ?? []
  const selectedDateLabel = useMemo(() => {
    const parsed = parseDateKey(selectedDate)
    if (!parsed) return selectedDate
    return parsed.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }, [selectedDate])

  return (
    <div className="calendar-panel">
      <EventForm onSubmit={addEvent} />
      <div className="calendar-panel__body">
        <TripCalendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          events={events}
          onSelectDate={setSelectedDate}
          onMonthChange={setCurrentMonth}
        />
        <div className="calendar-panel__events">
          <div className="calendar-panel__heading">
            <h3 className="calendar-panel__title">Events on {selectedDateLabel}</h3>
            <span className="calendar-panel__count">
              {selectedEvents.length}
            </span>
          </div>
          <EventList events={selectedEvents} onRemove={removeEvent} />
        </div>
      </div>
    </div>
  )
}
