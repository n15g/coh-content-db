# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Simplified the development toolchain and added explicit TypeScript validation to continuous integration and release builds.

---

## [2.2.2-beta.0] - 2026-08-11

### Changed

- Updated the development toolchain, including TypeScript 6 and the latest lint rules.
- Modernized continuous integration and release workflows for Node 24, reproducible installs, least-privilege permissions, and built-in GitHub authentication.
- Configured npm publishing to use the `beta` tag for prereleases and `latest` for stable releases.
- Updated transitive dependencies to address security advisories.

---

## [2.2.1] - 2026-03-27

### Changed

- Allowed badge IDs to differ for primal- and praetorian-origin characters.

---

## [2.2.0] - 2026-03-27

### Added

- Added the required `gameId` field to badge data for tools such as `/build_save` ([#31](https://github.com/n15g/coh-content-db/pull/31)).

---

## [2.1.0] - 2026-01-20

### Added

- Allowed character origin in a variant context to prioritize praetorian-origin variants.

---

## [2.0.0] - 2026-01-05

### Added

- Introduced indexing and search for badge names, text, and acquisition information.
- Added formal support for Missions and Contacts in badge requirements.
- Added optional level ranges and morality to `Zone` data.
- Added formal objects for level ranges and SetTitle IDs.
- Required badges to define a `releaseDate`.
- Required bundle headers to define a name, version, and last-update time.
- Added this changelog, continuous integration, linting, and unit tests.

### Changed

- Renamed server groups to forks.
- Replaced enum types with kebab-case union types.
- Renamed `IServerGroupData` to `BundleData` and scoped databases to a single bundle.
- Made database instances immutable and loaded bundle data through the constructor.
- Renamed `GameMap` to `Zone`.
- Renamed badge partials to badge requirements.
- Changed `Badge.getRequirement()` to return `undefined` for an unknown key.
- Moved exploration badge locations into badge requirements.
- Standardized zone and badge references on Markdown link syntax.
- Updated field names for consistent pluralization.
- Folded `VidiotMap` data into `Location` data.
- Consolidated SetTitle IDs into a tuple field.
- Moved bundle metadata into `BundleData.header`.
- Replaced redundant interfaces with concrete types.
- Changed the license to [The Unlicense](https://unlicense.org/).
- Switched the build system from Webpack to Rollup.

### Removed

- Removed `serverGroup` from entities because a database supports only one context.
- Removed all third-party runtime dependencies.
- Removed VidiotMap data from the Zone API.
- Removed the changelog API in favor of this file.
