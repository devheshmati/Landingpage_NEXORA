// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // اگر لینک دارای Hash باشد (مثلاً #features)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        // در صورت نیاز به offset برای هدر ثابت (Fixed Header)
        top: 80 
      }
    }

    // بازگشت به موقعیت قبلی در صورت زدن دکمه Back مرورگر
    if (savedPosition) {
      return savedPosition
    }

    // هدایت به بالای صفحه برای صفحات جدید
    return { top: 0, behavior: 'smooth' }
  }
}
