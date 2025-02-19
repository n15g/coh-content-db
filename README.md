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

Data providers utilize the various `-Data` interfaces provided in this package to construct server group data packages
that can be loaded into the db for consumption by DB consumers such as [Badger](https://github.com/n15g/badger).

For an example data package, see the [coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming) project.

### Defining archetypes, map, badges, etc.

To define content, create a new instance using the appropriate `Data` interface and provide values for the required fields:

```typescript
///test-badge.ts
import {BadgeData} from 'coh-content-db'

export const TEST_BADGE: BadgeData = {
    key: 'test-badge',
    type: 'ACHIEVEMENT',
    name: [{value: 'Test Badge'}, {alignment: 'P', value: 'My Badge for Praetorians'}],
    alignment: ['H', 'V', 'P'],
}
```

Then, create a `ServerGroupData` instance and load your content into the appropriate field.

```typescript
import {ServerGroupData} from 'coh-content-db'
import {TEST_BADGE} from './test-badge'

export const TEST_SERVER_GROUP: ServerGroupData = {
    key: 'my-server-group',
    name: 'My Server Group',
    badges: [TEST_BADGE],
}
```

## As a DB consumer

Create a a new database instance, then load a server-group data pack, such as [coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming):

```typescript
import {CohContentDatabase} from 'coh-content-db';
import {Homecoming} from 'coh-content-db-homecoming';

const db = new CohContentDatabase();
db.loadServerGroupData(new Homecoming());
```

Once loaded, you can start retrieving the loaded data using the keys associated with the various content:

#### List loaded server groups:

```typescript
db.listServerGroups();
```

#### Get a server group by key and list the badges:

```typescript
const sg = db.getServerGroup("server-group-key");
for (const badge of sg.badges) {
    console.log(badge.key)
}
```
