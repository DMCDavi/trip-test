import type React from 'react'

import { CATEGORIES } from '../../../../shared/constants'
import type { BucketId, PackingItem } from '../../models/packing.models'

const categoryLabelMap = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category.label])
)

type BucketColumnProps = {
  bucketId: BucketId
  label: string
  description: string
  items: PackingItem[]
  onDropItem: (itemId: string, bucketId: BucketId) => void
}

export const BucketColumn = ({
  bucketId,
  label,
  description,
  items,
  onDropItem,
}: BucketColumnProps) => {
  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    const itemId = event.dataTransfer.getData('text/plain')
    if (itemId) {
      onDropItem(itemId, bucketId)
    }
  }

  return (
    <section className="bucket" onDragOver={handleDragOver} onDrop={handleDrop}>
      <header className="bucket__header">
        <div>
          <h3 className="bucket__title">{label}</h3>
          <p className="bucket__description">{description}</p>
        </div>
        <span className="bucket__count">{items.length}</span>
      </header>

      {items.length === 0 ? (
        <p className="bucket__empty">No items here yet.</p>
      ) : (
        <ul className="bucket__list">
          {items.map((item) => (
            <li
              key={item.id}
              className="bucket__card"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData('text/plain', item.id)
                event.dataTransfer.effectAllowed = 'move'
              }}
            >
              <span className="bucket__item-name">{item.name}</span>
              <span className="bucket__item-category">
                {categoryLabelMap[item.category]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
