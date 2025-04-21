import { defineFixture } from 'efate'
import { BundleHeaderData } from '../../main'

export const bundleHeaderDataFixture = defineFixture<BundleHeaderData>((t) => {
  t.name.as(index => `Bundle ${index}`)
  t.version.as(index => `${index}.${index}.${index}`)
  t.lastUpdateTime.as(() => new Date().toISOString())
})
