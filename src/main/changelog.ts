import { Change } from './api/change'

export const CHANGELOG: Change[] = [
  {
    version: '2.0.0',
    date: new Date('2025-03-12'),
    description: ''
      + '* Replaced redundant interfaces with their concrete equivalents.\n'
      + `* Server groups are now referred to as 'forks'.\n`
      + '* Replaced enums with extensible union types; Forks with new badge types, enhancement types, etc. can now extend them locally.\n'
      + '* `IServerGroupData` is now `ContentBundle` and each database instance is now designed to accept only a single server group.\n'
      + '* Removed the `serverGroup` property from entities to simplify the object tree given that only a single context can exist per db now.\n'
      + '* Added a simple indexing and search function for badge names, text and acquisition info.\n'
      + '* Standardized pluralization of some field names (name, icon).\n'
      + '* Combined `settitle` ids into a single tuple field.\n'
      + '* Change from GNU to The Unlicense.\n'
      + '* Removed dependency on lodash.\n'
      + '* Moved from webpack to rollup for packaging.\n'
      + '* Add eslint for linting.\n'
      + '* Add jest for unit tests.\n'
      + '* Added GitHub Actions for CI.\n',
  },
]
