import type { GoodsItem } from '@/types/global'

export type BannerItem = {
  hreUrl: string
  id: string
  imgUrl: string
  type: number
}

export type CategoryItem = {
  id: number
  icon: string
  name: string
}

export type HotItem = {
  id: number
  title: string
  alt: string
  type: string
  pictures: string[]
}

export type GuessItem = GoodsItem
