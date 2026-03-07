# NaologicTechtest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Development server

To start a local development server, run:

```bash
npm run start:db
```

```bash
npm run start:dev
```

If you whant to see the changes in the library reflected on the app in real time, you need to run these commands in two separated consoles:

```bash
npm run start:db
```

```bash
npm run build:ds-watch
```

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

For interactive Cypress:

```bash
npm run test:interactive
```

Or CLI:

```bash
npm run test:cli
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Data Models & Backend Setup

This project uses a shared data model approach where all TypeScript interfaces are defined in the `naologic-ds` library for type safety across the monorepo. The backend is mocked using `json-server` with seeded sample data.

### Adding a New Model

1. **Define the interface** in `projects/naologic-ds/src/lib/models/`
   - Create a new `.ts` file (e.g., `new-model.model.ts`)
   - Use strict typing, avoid `any`
   - Follow the document structure pattern: `{ docId: string; docType: string; data: { ... } }`

2. **Export from public API**
   - Add `export * from './lib/models/new-model.model';` to `projects/naologic-ds/src/public-api.ts`
   - Build the library: `npm run build:ds`

3. **Create CRUD service** (if needed)
   - Extend `CrudService<T>` in `projects/naologic-techtest/src/app/services/`
   - Add unit tests in `.spec.ts` file

### Seeding json-server

Sample data is stored in `projects/json-db/db.json`. To regenerate or add new seed data:

1. **Update db.json** manually with new records matching your model structure
2. **Start the server**: `npm run start:db` (runs on port 3000)
3. **Verify endpoints**: GET `/workCenters`, `/workOrders`, etc.

### Model Workflow Summary

```
1. Define model in naologic-ds/models/
2. Export via public-api.ts
3. Build library: npm run build:ds
4. Create service in app/services/ (if CRUD needed)
5. Seed json-server in json-db/db.json
6. Import models: import { Model } from 'naologic-ds'
```

This ensures type safety and consistency across the application and library.
