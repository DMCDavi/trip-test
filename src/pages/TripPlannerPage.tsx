import { RemindersPanel } from '../modules/trip-planner/components/organisms/RemindersPanel'
import { CalendarPanel } from '../modules/trip-planner/components/organisms/CalendarPanel'

export const TripPlannerPage = () => {
  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">TripTest Planner</p>
          <h1 className="page__title">Trip Events & Reminders</h1>
          <p className="page__subtitle">
            Organize what needs to happen, when it happens, and what to remember
            before you leave.
          </p>
        </div>
        <div className="page__badge">Local only - No API</div>
      </header>

      <section className="page__panel">
        <div>
          <h2 className="page__panel-title">Reminders list</h2>
          <p className="page__panel-subtitle">
            Capture quick reminders and keep them visible during planning.
          </p>
        </div>
        <RemindersPanel />
      </section>

      <section className="page__panel page__panel--board">
        <div>
          <h2 className="page__panel-title">Trip calendar</h2>
          <p className="page__panel-subtitle">
            Visualize important dates and upcoming events for the trip.
          </p>
        </div>
        <CalendarPanel />
      </section>
    </div>
  )
}
