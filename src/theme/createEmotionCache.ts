import type { Options as EmotionCacheOptions } from '@emotion/cache'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'

export function getEmotionCacheOptions(direction: 'ltr' | 'rtl'): Partial<EmotionCacheOptions> {
  return {
    key: direction === 'rtl' ? 'mui-rtl' : 'mui',
    stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [prefixer],
    prepend: true,
  }
}
