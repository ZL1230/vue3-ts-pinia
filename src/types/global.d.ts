export type PageParams = {
  page?: number
  pageSize?: number
}
// 通用分页结果类型
export type PageResult<T> = {
  // 总条数
  counts: number
  // 列表数据
  items: T[]
  // 当前页数
  page: number
  // 每页条数
  pageSize: number
  // 总页数
  pages: number
}

// 商品信息
export type GoodsItem = {
  id: number
  picture: string
  name: string
  price: string
  orderNum: number
  discount: number
  desc: string
}
