import type { GoodsItem, PageResult } from '@/types/global'

// 热门推荐-子选项
export type SubTypeItem = {
  id: string
  title: string
  goodsItems: PageResult<GoodsItem>
}

// 热门推荐
export type HotResult = {
  id: string
  bannerPicture: string
  title: string
  subTypes: SubTypeItem[]
}
