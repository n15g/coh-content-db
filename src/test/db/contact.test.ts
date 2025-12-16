import { Contact } from '../../main'
import { contactDataFixture } from '../api/contact-data.fixture'

describe(Contact.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new Contact(contactDataFixture.create())
    })
  })

  describe('key', () => {
    test(`should be set from the data`, () => {
      const contact = new Contact(contactDataFixture.create({ key: 'foo' }))
      expect(contact.key).toEqual('foo')
    })
  })

  describe('name', () => {
    test(`should be set from the data`, () => {
      const contact = new Contact(contactDataFixture.create({ name: 'foo' }))
      expect(contact.name).toEqual('foo')
    })
  })

  describe('title', () => {
    test(`should be set from the data`, () => {
      const contact = new Contact(contactDataFixture.create({ title: 'foo' }))
      expect(contact.title).toEqual('foo')
    })

    test(`should be optional`, () => {
      const contact = new Contact(contactDataFixture.omit('title').create())
      expect(contact.title).toBeUndefined()
    })
  })

  describe('morality', () => {
    test(`should be set from the data`, () => {
      const contact = new Contact(contactDataFixture.create({ morality: ['hero'] }))
      expect(contact.morality?.hero).toBeTruthy()
      expect(contact.morality?.vigilante).toBeFalsy()
    })

    test(`should be optional`, () => {
      const contact = new Contact(contactDataFixture.omit('morality').create())
      expect(contact.morality?.all).toBeTruthy()
    })
  })

  describe('zoneKey', () => {
    test(`should be set from the data`, () => {
      const contact = new Contact(contactDataFixture.create({ location: { zoneKey: 'atlas-park', coords: [1, -2, 3.5] } }))
      expect(contact.location).toEqual({ zoneKey: 'atlas-park', coords: [1, -2, 3.5] })
    })

    test(`should be optional`, () => {
      const contact = new Contact(contactDataFixture.omit('location').create())
      expect(contact.location).toBeUndefined()
    })
  })

  describe('levelRange', () => {
    test(`should be set from the data`, () => {
      const contact = new Contact(contactDataFixture.create({ levelRange: [1, 2] }))
      expect(contact?.levelRange?.min).toEqual(1)
      expect(contact?.levelRange?.max).toEqual(2)
    })

    test(`should be optional`, () => {
      const contact = new Contact(contactDataFixture.omit('levelRange').create())
      expect(contact.levelRange).toBeUndefined()
    })
  })

  describe('notes', () => {
    test(`should be set from the data`, () => {
      const contact = new Contact(contactDataFixture.create({ notes: 'foo' }))
      expect(contact.notes).toEqual('foo')
    })

    test(`should be optional`, () => {
      const contact = new Contact(contactDataFixture.omit('notes').create())
      expect(contact.notes).toBeUndefined()
    })
  })

  describe('links', () => {
    test(`should be set from the data`, () => {
      const contact = new Contact(contactDataFixture.create({ links: [{ title: 'foo', href: 'bar' }] }))
      expect(contact.links).toStrictEqual([{ title: 'foo', href: 'bar' }])
    })

    test(`should be optional`, () => {
      const contact = new Contact(contactDataFixture.omit('links').create())
      expect(contact.links).toHaveLength(0)
    })
  })
})
