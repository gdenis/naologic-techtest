# Feature: Data Models & Backend Setup

## Why

To establish a single source of truth for the application’s data structures and to provide a realistic backend during development. Defining the models in the shared `naologic‑ds` library ensures type safety across both the front‑end and the fake `json‑server` backend. Seeding `json‑server` with sample data accelerates feature development and allows the UI to be built against predictable responses.

## What

- Create TypeScript interfaces/classes for the domain entities (e.g. `WorkOrder`, `Technician`, `Location`, etc.) inside `projects/naologic‑ds/src/lib/models`.
- Export every model from `naologic‑ds`’s public API (`public-api.ts`) so the app can import them with `import { WorkOrder } from 'naologic-ds';`.
- Configure `json-server` (the `json-db` project) to use these models for type hints and seed it with representative sample data.
- Add a script or instructions for regenerating the `db.json` seed when the models change.

## Constraints

### Must

- Define **all** models in `naologic‑ds` – the app and any tooling consume models only from the library.
- Expose models via `naologic‑ds/src/public-api.ts` so `naologic-techtest` imports are library‑centric.
- Use strict typing; avoid using `any`.
- Seed `json-server` (`projects/json-db/db.json`) with at least one example record per model.
- Create a HTTPClient service with the CRUD functionalities on `naologic-techtest/src/app/services` and create the unit tests.

### Must Not

- Duplicate model definitions in the application or backend.
- Hard‑code example data directly in the app, always fetch from `json-server`.

### Out of Scope

- Actual production backend implementation.
- Complex business logic or validation in the models.

## Current State

- Monorepo contains `naologic-techtest` (app), `naologic-ds` (library) and `json-db` (mock backend).
- No models exist yet; `db.json` is empty or unseeded.
- `naologic-ds` public API exports only the component wrappers currently.

## Tasks

### T1: Define shared data models

**What:** Create the models described on the file `.ia\project\FE-technical-test (2).md` under the Data Structures part as interfaces/types. Save them on the `projects/naologic-ds/src/lib/models` folder with appropriate fields and optional properties.  
**Files:** `projects/naologic-ds/src/lib/models/*.ts`, update `public-api.ts`.  
**Verify:** Models compile; `npm run build:ds` succeeds. The app imports a model and uses it in a component or service type annotation without TypeScript errors.

### T2: Export models via public API

**What:** Add `export * from './lib/models';` 
**Files:** `public-api.ts`.  
**Verify:** `npm run build:ds` still passes; the app can import models using the library path.

### T3: Seed `json-server` with sample data

**What:** Populate `projects/json-db/db.json` with example records matching the new models.  
**Files:** `projects/json-db/db.json`, plus any seed script.  
**Verify:** Start `json-server` (`npm run start:json-db` or similar) and GET endpoints return the sample records. The UI can fetch work orders and display them.


### T4: Create CRUD HTTPClient service 

**What:**: Create two CRUD services, one for `WorkCenterDocument`, and the other for Work Order. 
**Files:** `projects/json-db/db.json`, plus any seed script.  
**Verify:** Start `json-server` (`npm run start:json-db` or similar) and GET endpoints return the sample records. The UI can fetch work orders and display them.


### T5: Document the workflow

**What:** Update README or add comments explaining how to add a new model and regenerate the seed data.  
**Files:** `projects/naologic-ds/README.md` or root `README.md`.  
**Verify:** Another developer can follow the instructions to extend the models and re‑seed without confusion.
