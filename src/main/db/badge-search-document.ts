import { Badge } from './badge'

export class BadgeSearchDocument {
  id: string
  key: string
  name: string
  badgeText: string
  acquisition: string

  constructor(badge: Badge) {
    this.id = this.key = badge.key
    this.name = badge.name.toString(', ')
    this.badgeText = badge.badgeText.toString(', ')
    this.acquisition = badge.acquisition ?? ''
  }
}
