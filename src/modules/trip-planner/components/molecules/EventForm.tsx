import type React from 'react'
import { useState } from 'react'

import type { NewTripEvent } from '../../models/tripPlanner.models'

const DEFAULT_FORM: NewTripEvent = {
  title: '',
  date: '',
  note: '',
}

type EventFormProps = {
  onSubmit: (input: NewTripEvent) => void
}

export const EventForm = ({ onSubmit }: EventFormProps) => {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [error, setError] = useState<string | null>(null)

  const handleChange =
    (field: keyof NewTripEvent) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError(null)
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = form.title.trim()

    if (!title || !form.date) {
      setError('Please enter a title and date.')
      return
    }

    onSubmit({
      title,
      date: form.date,
      note: form.note?.trim() || undefined,
    })

    setForm(DEFAULT_FORM)
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="event-form__field">
        <label className="event-form__label" htmlFor="event-title">
          Event
        </label>
        <input
          id="event-title"
          className="event-form__input"
          placeholder="Check-in for flight"
          value={form.title}
          onChange={handleChange('title')}
        />
      </div>

      <div className="event-form__field">
        <label className="event-form__label" htmlFor="event-date">
          Date
        </label>
        <input
          id="event-date"
          type="date"
          className="event-form__input"
          value={form.date}
          onChange={handleChange('date')}
        />
      </div>

      <div className="event-form__field event-form__field--note">
        <label className="event-form__label" htmlFor="event-note">
          Note
        </label>
        <input
          id="event-note"
          className="event-form__input"
          placeholder="Terminal B, bring passport"
          value={form.note ?? ''}
          onChange={handleChange('note')}
        />
      </div>

      <button type="submit" className="event-form__button">
        Add event
      </button>

      {error ? <p className="event-form__error">{error}</p> : null}
    </form>
  )
}
