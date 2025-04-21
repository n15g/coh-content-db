import { defineFixture } from 'efate'
import { BundleData } from '../../main'
import { bundleHeaderDataFixture } from './bundle-header-data.fixture'

export const bundleDataFixture = defineFixture<BundleData>((t) => {
  t.header.fromFixture(bundleHeaderDataFixture)
})
