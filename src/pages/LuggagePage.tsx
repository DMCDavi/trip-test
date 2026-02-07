import { APP_NAME } from '../shared/constants'
import { PackingBoard } from '../modules/packing/components/organisms/PackingBoard'
import { PackingForm } from '../modules/packing/components/molecules/PackingForm'
import { PackingImport } from '../modules/packing/components/molecules/PackingImport'

export const LuggagePage = () => {
  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">{APP_NAME} MVP</p>
          <h1 className="page__title">Trip Luggage Planner</h1>
          <p className="page__subtitle">
            A focused, single-page MVP for organizing travel essentials into
            keep, give away, and take away buckets.
          </p>
        </div>
        <div className="page__badge">Local only - No API</div>
      </header>

      <section className="page__panel">
        <div>
          <h2 className="page__panel-title">Add a new item</h2>
          <p className="page__panel-subtitle">
            Capture what you need to decide before packing the trip.
          </p>
        </div>
        <PackingForm />
        <PackingImport />
      </section>

      <section className="page__panel page__panel--board">
        <div>
          <h2 className="page__panel-title">Sort into buckets</h2>
          <p className="page__panel-subtitle">
            Keep items visible by bucket to decide what stays, goes, or gets
            packed.
          </p>
        </div>
        <PackingBoard />
      </section>
    </div>
  )
}
