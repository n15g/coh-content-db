import { defineFixture } from 'efate'
import { ContentBundle } from '../../main'

export const contentBundleFixture = defineFixture<ContentBundle>((t) => {
  t.name.as(index => `Bundle ${index}`)
})
