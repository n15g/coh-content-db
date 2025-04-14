import { BundleMetadata } from '../../main'
import { contentBundleFixture } from '../api/content-bundle.fixture'

describe(BundleMetadata.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new BundleMetadata(contentBundleFixture.create())
    })
  })

  describe('name', () => {
    test(`should be read from the bundle`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.create({ name: 'foo' }))
      expect(bundle.name).toBe('foo')
    })
  })

  describe('description', () => {
    test(`should be read from the bundle`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.create({ description: 'foo' }))
      expect(bundle.description).toBe('foo')
    })

    test(`should be optional`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.omit('description').create())
      expect(bundle.description).toBeUndefined()
    })
  })

  describe('repository', () => {
    test(`should be read from the bundle`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.create({ repository: 'foo' }))
      expect(bundle.repository).toBe('foo')
    })

    test(`should be optional`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.omit('repository').create())
      expect(bundle.repository).toBeUndefined()
    })
  })

  describe('links', () => {
    test(`should be read from the bundle`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.create({ links: [{ title: 'foo', href: 'bar' }] }))
      expect(bundle.links).toStrictEqual([{ title: 'foo', href: 'bar' }])
    })

    test(`should be optional`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.omit('links').create())
      expect(bundle.links).toHaveLength(0)
    })
  })

  describe('changelog', () => {
    test(`should be read from the bundle`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.create({
        changelog: [{ version: 'foo', date: new Date('2025-03-12'), description: 'bar' }],
      }))
      expect(bundle.changelog).toStrictEqual([{ version: 'foo', date: new Date('2025-03-12'), description: 'bar' }])
    })

    test(`should be optional`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.omit('changelog').create())
      expect(bundle.changelog).toHaveLength(0)
    })
  })

  describe('version', () => {
    test(`should be read from the latest changelog entry`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.create({
        changelog: [
          { version: 'foo', date: new Date('2025-03-12'), description: 'Foo' },
          { version: 'latest', date: new Date('2025-04-12'), description: 'Bar' },
        ],
      }))
      expect(bundle.version).toBe('latest')
    })

    test(`should be undefined if there is no changelog`, () => {
      const bundle = new BundleMetadata(contentBundleFixture.omit('changelog').create())
      expect(bundle.version).toBeUndefined()
    })
  })
})
