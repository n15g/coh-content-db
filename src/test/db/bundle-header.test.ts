import { BundleHeader } from '../../main'
import { bundleHeaderDataFixture } from '../api/bundle-header-data.fixture'

describe(BundleHeader.name, () => {
  describe('name', () => {
    test(`should be set from the data`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.create({ name: 'foo' }))
      expect(header.name).toEqual('foo')
    })

    test(`should be optional`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.omit('name').create())
      expect(header.name).toBeUndefined()
    })
  })

  describe('description', () => {
    test(`should be set from the data`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.create({ description: 'foo' }))
      expect(header.description).toEqual('foo')
    })

    test(`should be optional`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.omit('description').create())
      expect(header.description).toBeUndefined()
    })
  })

  describe('repositoryUrl', () => {
    test(`should be set from the data`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.create({ repositoryUrl: 'foo' }))
      expect(header.repositoryUrl).toEqual('foo')
    })

    test(`should be optional`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.omit('repositoryUrl').create())
      expect(header.repositoryUrl).toBeUndefined()
    })
  })

  describe('changelogUrl', () => {
    test(`should be set from the data`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.create({ changelogUrl: 'foo' }))
      expect(header.changelogUrl).toEqual('foo')
    })

    test(`should be optional`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.omit('changelogUrl').create())
      expect(header.changelogUrl).toBeUndefined()
    })
  })

  describe('links', () => {
    test(`should be set from the data`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.create({ links: [{ title: 'foo', href: 'bar' }] }))
      expect(header.links).toStrictEqual([{ title: 'foo', href: 'bar' }])
    })

    test(`should be optional`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.omit('links').create())
      expect(header.links).toHaveLength(0)
    })
  })

  describe('version', () => {
    test(`should be set from the data`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.create({ version: 'foo' }))
      expect(header.version).toEqual('foo')
    })

    test(`should be optional`, () => {
      const header = new BundleHeader(bundleHeaderDataFixture.omit('version').create())
      expect(header.version).toBeUndefined()
    })
  })
})
