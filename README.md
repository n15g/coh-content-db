# coh-content-db

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/n15g/coh-content-db/build.yml?branch=master)](https://github.com/n15g/coh-content-db/actions)
[![Codecov](https://img.shields.io/codecov/c/github/n15g/coh-content-db)](https://app.codecov.io/gh/n15g/coh-content-db)
[![GitHub Tag](https://img.shields.io/github/v/tag/n15g/coh-content-db)](https://github.com/n15g/coh-content-db/tags)
[![NPM Version](https://img.shields.io/npm/v/coh-content-db)](https://www.npmjs.com/package/coh-content-db)
[![GitHub License](https://img.shields.io/github/license/n15g/coh-content-db)](LICENSE)


City of Heroes Content Database

### Installation
```
npm install coh-content-db
```

### Usage

Initialize the database, then load a server-group data pack, such as `coh-content-db-homecoming`:
```
import {CohContentDb} from "coh-content-db";
import {Homecoming} from "coh-content-db-homecoming";

const contentDb = new CohContentDb();
contentDb.load(new Homecoming());
```

Once loaded, you can start retrieving loaded data using the keys associated with the various content.

#### List Loaded Server Groups:
```
contentDb.getServerGroups();
```

#### Get a Server Group by key:
```
contentDb.getServerGroup("serverGroupKey");
```

### Build
`npm run build`

### Deploy
`npm package`
