import { useMemo } from 'react'

import { BUCKETS } from '../../../shared/constants'
import { usePackingStore } from '../stores/packing.store'
import type { BucketId, PackingItem } from '../models/packing.models'

type BucketWithItems = {
  id: BucketId
  label: string
  description: string
  items: PackingItem[]
}

export const usePackingBuckets = (): BucketWithItems[] => {
  const items = usePackingStore((state) => state.items)

  return useMemo(
    () =>
      BUCKETS.map((bucket) => ({
        ...bucket,
        items: items.filter((item) => item.bucket === bucket.id),
      })),
    [items]
  )
}
