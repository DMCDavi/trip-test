import type React from 'react'
import { useState } from 'react'

import { BUCKETS, CATEGORIES } from '../../../../shared/constants'
import { usePackingStore } from '../../stores/packing.store'
import type { BucketId, CategoryId, NewPackingItem } from '../../models/packing.models'

const categoryIds = new Set(CATEGORIES.map((category) => category.id))
const bucketIds = new Set(BUCKETS.map((bucket) => bucket.id))

type ImportResult = {
  added: number
  error?: string
}

const coerceItems = (payload: unknown): NewPackingItem[] | null => {
  if (!payload) return null

  const rawItems = Array.isArray(payload)
    ? payload
    : typeof payload === 'object' && payload !== null && 'items' in payload
      ? (payload as { items?: unknown }).items
      : null

  if (!Array.isArray(rawItems)) return null

  const items: NewPackingItem[] = []

  for (const entry of rawItems) {
    if (!entry || typeof entry !== 'object') return null
    const candidate = entry as {
      name?: unknown
      category?: unknown
      bucket?: unknown
    }
    if (typeof candidate.name !== 'string') return null
    if (typeof candidate.category !== 'string') return null
    if (typeof candidate.bucket !== 'string') return null

    const name = candidate.name.trim()
    const category = candidate.category as CategoryId
    const bucket = candidate.bucket as BucketId

    if (!name) return null
    if (!categoryIds.has(category)) return null
    if (!bucketIds.has(bucket)) return null

    items.push({ name, category, bucket })
  }

  return items
}

export const PackingImport = () => {
  const addItems = usePackingStore((state) => state.addItems)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [busy, setBusy] = useState(false)

  const readFileText = async (file: File) => {
    if (typeof file.text === 'function') {
      return file.text()
    }

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result ?? ''))
      reader.onerror = () => reject(new Error('read-failed'))
      reader.readAsText(file)
    })
  }

  const handleFile = async (file: File) => {
    setBusy(true)
    setResult(null)

    try {
      const content = await readFileText(file)
      const payload = JSON.parse(content)
      const items = coerceItems(payload)

      if (!items || items.length === 0) {
        setResult({ added: 0, error: 'Invalid or empty JSON payload.' })
        return
      }

      addItems(items)
      setResult({ added: items.length })
    } catch {
      setResult({ added: 0, error: 'Unable to read JSON file.' })
    } finally {
      setBusy(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      void handleFile(file)
      event.currentTarget.value = ''
    }
  }

  return (
    <div className="packing-import">
      <div>
        <p className="packing-import__title">Import items</p>
        <p className="packing-import__subtitle">
          Upload a JSON file with an array of items or an object with an
          <code>items</code> array.
        </p>
      </div>
      <label className="packing-import__button" htmlFor="import-json">
        {busy ? 'Importing...' : 'Choose JSON file'}
      </label>
      <input
        id="import-json"
        type="file"
        accept="application/json"
        onChange={handleChange}
        className="packing-import__input"
      />
      {result ? (
        <p className="packing-import__status" data-error={Boolean(result.error)}>
          {result.error
            ? result.error
            : `Imported ${result.added} item${result.added === 1 ? '' : 's'}.`}
        </p>
      ) : null}
    </div>
  )
}
