# coh-content-db

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/n15g/coh-content-db/build.yml?branch=master)](https://github.com/n15g/coh-content-db/actions)
[![Codecov](https://img.shields.io/codecov/c/github/n15g/coh-content-db)](https://app.codecov.io/gh/n15g/coh-content-db)
[![GitHub Tag](https://img.shields.io/github/v/tag/n15g/coh-content-db)](https://github.com/n15g/coh-content-db/tags)
[![NPM Version](https://img.shields.io/npm/v/coh-content-db)](https://www.npmjs.com/package/coh-content-db)
[![GitHub License](https://img.shields.io/github/license/n15g/coh-content-db)](LICENSE)

City of Heroes Content Database

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

### Defining archetypes, map, badges, etc.

To define content, create a new instance using the appropriate `Data` interface and provide values for the required fields:

```typescript
///test-badge.ts
import { BadgeData } from 'coh-content-db'

export const TEST_BADGE: BadgeData = {
    key: 'test-badge',
    type: 'ACHIEVEMENT',
    name: [{ value: 'Test Badge' }, { alignment: 'P', value: 'My Badge for Praetorians' }],
    alignment: ['H', 'V', 'P'],
}
```

Then, create a `ServerGroupData` instance and load your content into the appropriate field.

```typescript
import { ContentBundle } from './content-bundle'
import { TEST_BADGE } from './test-badge'

export const TEST_SERVER_GROUP: ContentBundle = {
    name: 'My Content Bundle',
    badges: [TEST_BADGE],
}
```

## As a DB consumer

Create a new database instance, then load a content bundle, such as [coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming):

```typescript
import { CohContentDatabase } from 'coh-content-db';
import { Homecoming } from 'coh-content-db-homecoming';

const db = new CohContentDatabase();
db.loadBundle(new Homecoming());
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
