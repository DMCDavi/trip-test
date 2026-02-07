import type React from 'react'
import { useState } from 'react'

import type { NewTripReminder } from '../../models/tripPlanner.models'

const DEFAULT_FORM: NewTripReminder = {
  text: '',
  dueDate: '',
}

type ReminderFormProps = {
  onSubmit: (input: NewTripReminder) => void
}

export const ReminderForm = ({ onSubmit }: ReminderFormProps) => {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [error, setError] = useState<string | null>(null)

  const handleChange =
    (field: keyof NewTripReminder) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError(null)
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = form.text.trim()

    if (!text) {
      setError('Please enter a reminder.')
      return
    }

    onSubmit({
      text,
      dueDate: form.dueDate || undefined,
    })

    setForm(DEFAULT_FORM)
  }

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <div className="reminder-form__field">
        <label className="reminder-form__label" htmlFor="reminder-text">
          Reminder
        </label>
        <input
          id="reminder-text"
          className="reminder-form__input"
          placeholder="Book travel insurance"
          value={form.text}
          onChange={handleChange('text')}
        />
      </div>

      <div className="reminder-form__field">
        <label className="reminder-form__label" htmlFor="reminder-date">
          Due date
        </label>
        <input
          id="reminder-date"
          type="date"
          className="reminder-form__input"
          value={form.dueDate ?? ''}
          onChange={handleChange('dueDate')}
        />
      </div>

      <button type="submit" className="reminder-form__button">
        Add reminder
      </button>

      {error ? <p className="reminder-form__error">{error}</p> : null}
    </form>
  )
}
