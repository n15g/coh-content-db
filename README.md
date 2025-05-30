# coh-content-db

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/n15g/coh-content-db/build.yml?branch=master)](https://github.com/n15g/coh-content-db/actions)
[![Codecov](https://img.shields.io/codecov/c/github/n15g/coh-content-db)](https://app.codecov.io/gh/n15g/coh-content-db)
[![GitHub Tag](https://img.shields.io/github/v/tag/n15g/coh-content-db)](https://github.com/n15g/coh-content-db/tags)
[![NPM Version](https://img.shields.io/npm/v/coh-content-db)](https://www.npmjs.com/package/coh-content-db)
[![GitHub License](https://img.shields.io/github/license/n15g/coh-content-db)](LICENSE)

City of Heroes Content Database

# Change Log

[CHANGELOG.md](CHANGELOG.md)

# Installation

```
npm install coh-content-db
```

# Usage

There are two ways to use this package; As a data provider, or a db consumer.

## As a data provider

Data providers utilize the various `-Data` interfaces provided in this package to construct content bundles
that can be loaded into the db for consumption by DB consumers such as [Badger](https://github.com/n15g/badger).

For an example data package, see the [coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming) project.

### Defining archetypes, zones, badges, etc.

To define content, create a new instance using the appropriate `Data` interface and provide values for the required fields:

```typescript
///test-badge.ts
import { BadgeData } from 'coh-content-db'

export const TestBadge: BadgeData = {
    key: 'test-badge',
    type: 'achievement',
    name: [{ value: 'Test Badge' }, { alignment: 'praetorian', value: 'My Badge for Praetorians' }],
    releaseDate: '2020-03-01',
    alignment: ['hero', 'praetorian'],
}
```

Then, create a `BundleData` instance and load your content into the appropriate field.

```typescript
import { BundleData } from 'coh-content-db'

export const MyBundle: BundleData = {
    header: { name: 'My Content Bundle', version: '1.0.0', lastUpdateTime: '2025-04-21T00:00:00Z' },
    badges: [TestBadge],
}
```

### Markdown and Links

Fields with long text values can typically accept [Markdown](https://www.markdownguide.org/) format. These fields will also be typed with the tag type [MarkdownString](src/main/api/markdown-string.ts).

Within markdown, you can construct a link to a badge or zone using the special `badge://` and `zone://` protocol indicators that consumer apps can use to provide runtime links or tooltips.
This replaces the custom `[badge:xyz]` format from v1 and data packages will need to update accordingly.

To create a link, use the standard Markdown link format, with the url as following:

```markdown
This is a link to the [Ghoulish](badge://ghoulish) badge.
```

There are convenience functions also provided to construct the URI automatically that can be used as follows:

```typescript
import { badgeLink, badgeUri } from 'coh-content-db'

const uri = `This is a link to the [Ghoulish](${badgeUri('ghoulish')}) badge.`
// This is a link to the [Ghoulish](badge://ghoulish) badge.
const link = `This is a link to the ${badgeLink('ghoulish')} badge.`
// This is a link to the [ghoulish](badge://ghoulish) badge.
```

## As a DB consumer

Create a new database instance from a content bundle, such as [coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming):

```typescript
import { CohContentDatabase } from 'coh-content-db'
import { HOMECOMING } from 'coh-content-db-homecoming'

const database = new CohContentDatabase(HOMECOMING)
```

or from a JSON object:

```typescript
import { BundleData, CohContentDatabase } from 'coh-content-db'

const response = await fetch('https://n15g.github.io/coh-content-db-homecoming/bundle.json')
const bundle = await response.json() as BundleData

const database = new CohContentDatabase(bundle)
```

#### Access the content

```typescript
for (const badge of db.badges) {
    console.log(badge.key)
}
```

## Publish

Tags matching the pattern `v<X>.<Y>.<Z>` will attempt to publish to npm (this can only be achieved by the package manager (n15g).

```shell
npm version 1.4.x
npm run push
```
