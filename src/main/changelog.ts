import { Change } from './api/change'

export const CHANGELOG: Change[] = [
  {
    version: '2.0.0',
    date: new Date('2025-03-12'),
    description: ''
      + '* Replaced redundant interfaces with their concrete equivalents.\n'
      + '* Replaced enums with extensible union types; Server groups with new badge types, enhancement types, etc. can now extend them locally.\n'
      + '* Removed the `serverGroup` property from entities to simplify the object tree; Server group context will need to be managed separately.\n'
      + '* Standardized pluralization of some field names (name, icon).\n'
      + '* Combined `settitle` ids into a single tuple field.\n'
      + '* Change from GNU to The Unlicense.\n'
      + '* Removed dependency on lodash. There are now no third-party runtime dependencies.\n'
      + '* Moved from webpack to rollup for packaging.\n'
      + '* Add eslint for linting.\n'
      + '* Add jest for unit tests.\n'
      + '* Added GitHub Actions for CI.\n',
  },
]
