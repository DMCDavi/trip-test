import { BUCKETS, CATEGORIES } from '../../../shared/constants'

export type CategoryId = (typeof CATEGORIES)[number]['id']
export type BucketId = (typeof BUCKETS)[number]['id']

export type PackingItem = {
  id: string
  name: string
  category: CategoryId
  bucket: BucketId
  createdAt: number
}

export type NewPackingItem = Omit<PackingItem, 'id' | 'createdAt'>
