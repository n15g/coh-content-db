# coh-content-db
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

####List Loaded Server Groups with their id:
```
contentDb.getServerGroups();
// [key: "homecoming", serverGroup: Homecoming...]
```

### Build
`npm run build`

### Deploy
`npm package`
