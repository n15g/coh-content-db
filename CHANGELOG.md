# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0-rc.14] - 2025-04-22

### Added

- Introduced a simple indexing and search function for badge names, text, and acquisition info.
- Enabled formal support for Missions and Contacts in badge requirements.
- Badges now require a `releaseDate`.
- Bundle header is now mandatory and requires at least a name, version and last update time.
- Added GitHub Actions for continuous integration (CI).
- Included `eslint` for linting.
- Added `jest` for unit testing.
- CHANGELOG.md

### Changed

- Server groups are now referred to as "forks".
- Enum types were replaced with union types, and values now use `kebab-case`.
- The `IServerGroupData` interface was renamed to `BundleData`, and databases are now scoped to a single bundle.
- Database instance is now immutable and bundle data is loaded in the constructor.
- `GameMap` was renamed to `Zone`.
- Badge partials are now referred to as badge requirements.
- `Badge.getRequirement()` now returns undefined instead of throwing an error on unknown key.
- Exploration badge locations were moved into the badge requirements list.
- References to zones and badges now use a standard Markdown link format (`badge://`, `map://`).
- Some field names were updated for consistent pluralization (e.g., `name`, `icon`).
- `VidiotMap` data was folded into `Location` data.
- `settitle` IDs were consolidated into a single tuple field.
- Bundle metadata is now found in the `BundleData.header` field.
- Redundant interfaces have been replaced with their concrete equivalents.
- The project license was changed from GNU to [The Unlicense](https://unlicense.org/).
- Switched the build system from Webpack to Rollup.

### Removed

- The `serverGroup` property was removed from entities to simplify the object model, since only one context is allowed per database.
- All third-party dependencies were removed.
- VidiotMap data was removed from the Zone API.
- Changelog API is removed in favor of the CHANGELOG.md file in the repository.
