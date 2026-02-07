import type React from 'react'
import { useState } from 'react'

import { BUCKETS, CATEGORIES } from '../../../../shared/constants'
import { usePackingStore } from '../../stores/packing.store'
import type { BucketId, CategoryId } from '../../models/packing.models'

const DEFAULT_CATEGORY = CATEGORIES[0].id
const DEFAULT_BUCKET = BUCKETS[0].id

type FormState = {
  name: string
  category: CategoryId
  bucket: BucketId
}

export const PackingForm = () => {
  const addItem = usePackingStore((state) => state.addItem)
  const [form, setForm] = useState<FormState>({
    name: '',
    category: DEFAULT_CATEGORY,
    bucket: DEFAULT_BUCKET,
  })
  const [error, setError] = useState<string | null>(null)

  const handleChange =
    <T extends keyof FormState>(field: T) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setError(null)
      const value = event.target.value as FormState[T]
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = form.name.trim()

    if (!name) {
      setError('Please enter an item name.')
      return
    }

    addItem({
      name,
      category: form.category,
      bucket: form.bucket,
    })

    setForm((prev) => ({
      ...prev,
      name: '',
    }))
    setError(null)
  }

  return (
    <form className="packing-form" onSubmit={handleSubmit}>
      <div className="packing-form__field">
        <label className="packing-form__label" htmlFor="item-name">
          Item
        </label>
        <input
          id="item-name"
          name="item-name"
          className="packing-form__input"
          placeholder="Spoon, video game..."
          value={form.name}
          onChange={handleChange('name')}
        />
      </div>

      <div className="packing-form__field">
        <label className="packing-form__label" htmlFor="item-category">
          Category
        </label>
        <select
          id="item-category"
          name="item-category"
          className="packing-form__select"
          value={form.category}
          onChange={handleChange('category')}
        >
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="packing-form__field">
        <label className="packing-form__label" htmlFor="item-bucket">
          Bucket
        </label>
        <select
          id="item-bucket"
          name="item-bucket"
          className="packing-form__select"
          value={form.bucket}
          onChange={handleChange('bucket')}
        >
          {BUCKETS.map((bucket) => (
            <option key={bucket.id} value={bucket.id}>
              {bucket.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="packing-form__button">
        Add item
      </button>

      {error ? <p className="packing-form__error">{error}</p> : null}
    </form>
  )
}
