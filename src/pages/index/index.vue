<script setup lang="ts">
import CustomNavbar from '@/pages/index/component/CustomNavbar.vue'
import XtxSwiper from '@/components/XtxSwiper.vue'
import { getHomeBannerApi, getHomeCategoryApi, getHomeHotApi } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from '@/pages/index/component/CategoryPanel.vue'
import HotPanel from '@/pages/index/component/HotPanel.vue'
import XtxGuess from '@/components/XtxGuess.vue'
import PageSkeleton from '@/pages/index/component/PageSkeleton.vue'
import type { XtxGuessInstance } from '@/types/components'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
}

// 获取分类数据
const categoryList = ref<CategoryItem[]>([])
const getCategoryData = async () => {
  const res = await getHomeCategoryApi()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHotData = async () => {
  const res = await getHomeHotApi()
  hotList.value = res.result
}

// 是否加载中标记
const isLoading = ref(false)

onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getCategoryData(), getHotData()])
  isLoading.value = false
})

// 获取猜你喜欢的组件实例
const guessRef = ref<XtxGuessInstance>()

const isTriggered = ref(false)

// 滚动触底事件
const onScrolltolower = () => {
  guessRef?.value?.getMore()
}

// 下拉刷新
const onRefreshfresh = async () => {
  isTriggered.value = true
  // 这种写法
  // await getHomeBannerData()
  // await getCategoryData()
  // await getHotData()

  // 重置猜你喜欢数组数据
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getCategoryData(),
    getHotData(),
    guessRef.value?.getMore(),
  ])
  isTriggered.value = false
}
</script>

<template>
  <!--    自定义导航栏-->
  <CustomNavbar></CustomNavbar>
  <scroll-view
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefreshfresh"
    scroll-y
    @scrolltolower="onScrolltolower"
  >
    <PageSkeleton v-if="isLoading"></PageSkeleton>
    <template v-else>
      <!--     轮播图-->
      <XtxSwiper :list="bannerList" />
      <!--    分类-->
      <CategoryPanel :list="categoryList" />
      <!--    热门推荐-->
      <HotPanel :list="hotList" />
      <!--    猜你喜欢-->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
