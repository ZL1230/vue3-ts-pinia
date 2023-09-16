import { useMemberStore } from '@/stores'

const baseUrl: string = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    //1.非HTTP开头
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    //2.请求超时
    options.timeout = 1000
    // 3.添加小程序的请求标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    //3.添加token
    const memberStorage = useMemberStore()
    const token = memberStorage.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param   UniApp.RequestOptions
 * @returns Promise
 */

interface Data<T> {
  code: string,
  msg: string,
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        // 状态码2xx 开头
        if (res.statusCode >= 200 && res.statusCode <= 300) {
          resolve(res.data as Data<T>)
        }
        // 401 错误 清除用户信息-》跳转登录页
        else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          // 其他错误 ->根据后端错误信息提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail(error) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(error)
      },
    })
  })
}

