export const changelog: Record<string, string> = {
  '2.0.0': '* Removed dependency on lodash.\n'
    + '* Moved from webpack to rollup for packaging.\n'
    + '* Change from GNU to The Unlicense.\n'
    + '* Added eslint.\n'
    + '* Added GitHub Actions for CI.\n'
    + '* Add eslint for linting.\n'
    + '* Add jest for unit tests.\n'
    + '* Replaced enums with union types.\n'
    + '* Replaced redundant interfaces with their concrete types.\n'
    + '* Removed the `serverGroup` property from entities to simplify the object tree; Server group context will need to be managed separately.\n',
}
