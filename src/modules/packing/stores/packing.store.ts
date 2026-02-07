import { create } from 'zustand'

import type { NewPackingItem, PackingItem } from '../models/packing.models'

const STORAGE_KEY = 'trip-test:packing-items'

const createItemId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `item-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const createItem = (input: NewPackingItem): PackingItem => ({
  id: createItemId(),
  createdAt: Date.now(),
  ...input,
})

const loadItems = (): PackingItem[] => {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item && typeof item.id === 'string')
  } catch {
    return []
  }
}

const persistItems = (items: PackingItem[]) => {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Ignore persistence errors (private mode, storage full, etc.)
  }
}

type PackingState = {
  items: PackingItem[]
  addItem: (input: NewPackingItem) => PackingItem
  addItems: (inputs: NewPackingItem[]) => PackingItem[]
  moveItem: (id: string, bucket: PackingItem['bucket']) => void
  reset: () => void
}

const initialState: Pick<PackingState, 'items'> = {
  items: loadItems(),
}

export const usePackingStore = create<PackingState>((set) => ({
  ...initialState,
  addItem: (input) => {
    const item = createItem(input)

    set((state) => {
      const items = [item, ...state.items]
      persistItems(items)
      return { items }
    })

    return item
  },
  addItems: (inputs) => {
    const created = inputs.map(createItem)

    set((state) => {
      const items = [...created, ...state.items]
      persistItems(items)
      return { items }
    })

    return created
  },
  moveItem: (id, bucket) => {
    set((state) => {
      const items = state.items.map((item) =>
        item.id === id ? { ...item, bucket } : item
      )
      persistItems(items)
      return { items }
    })
  },
  reset: () => {
    set({ items: [] })
    persistItems([])
  },
}))
