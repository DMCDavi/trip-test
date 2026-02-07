import { usePackingBuckets } from '../../hooks/usePackingBuckets'
import { usePackingStore } from '../../stores/packing.store'
import { BucketColumn } from '../molecules/BucketColumn'

export const PackingBoard = () => {
  const buckets = usePackingBuckets()
  const moveItem = usePackingStore((state) => state.moveItem)

  return (
    <section className="packing-board">
      {buckets.map((bucket) => (
        <BucketColumn
          key={bucket.id}
          bucketId={bucket.id}
          label={bucket.label}
          description={bucket.description}
          items={bucket.items}
          onDropItem={moveItem}
        />
      ))}
    </section>
  )
}
