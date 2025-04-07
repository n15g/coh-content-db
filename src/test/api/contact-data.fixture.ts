import { defineFixture } from 'efate'
import { ContactData } from '../../main'

export const contactDataFixture = defineFixture<ContactData>((t) => {
  t.key.as(index => `contact-${index}`)
  t.name.as(index => [{ value: `Contact ${index}` }])
  t.title?.as(index => [{ value: `Contact title ${index}` }])
  t.zoneKey?.asString()
  t.loc?.as(index => [index, index, index])
  t.levelRange?.as(index => [index, index])
  t.notes?.asLoremIpsum()
  t.links?.as(() => [{ title: 'foo', href: 'https://nouri.org' }])
})
