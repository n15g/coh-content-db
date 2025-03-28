import { Change } from './api/change'

export const CHANGELOG: Change[] = [
  {
    version: '2.0.0',
    date: new Date('2025-03-12'),
    description: ''
      + '* Replaced redundant interfaces with their concrete equivalents.\n'
      + `* Server groups are now referred to as 'forks'.\n`
      + '* Replaced enums with union types.\n'
      + '* `IServerGroupData` is now `ContentBundle` and each database instance is now designed to accept only a single server group.\n'
      + '* `GameMap` is now `Zone`.\n'
      + '* Removed the `serverGroup` property from entities to simplify the object tree given that only a single context can exist per db now.\n'
      + '* Added a simple indexing and search function for badge names, text and acquisition info.\n'
      + '* Zone and badge references now follow a standard Markdown link format with a `badge://` or `map://` protocol.\n'
      + '* Badge partials are now known as badge requirements and support both AND and OR groups of requirements.\n'
      + '* Removed the `VidiotMap` API as it was never used or fleshed out properly.\n'
      + '* Standardized pluralization of some field names (name, icon).\n'
      + '* Combined `settitle` ids into a single tuple field.\n'
      + '* Change from GNU to The Unlicense.\n'
      + '* Removed all third-party dependencies.\n'
      + '* Moved from webpack to rollup for packaging.\n'
      + '* Add eslint for linting.\n'
      + '* Add jest for unit tests.\n'
      + '* Added GitHub Actions for CI.\n',
  },
]
