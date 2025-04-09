import { defineFixture } from 'efate'
import { ContactData } from '../../main'

export const contactDataFixture = defineFixture<ContactData>((t) => {
  t.key.as(index => `contact-${index}`)
  t.name.as(index => [{ value: `Contact ${index}` }])
})
