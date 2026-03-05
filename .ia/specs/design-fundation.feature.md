# Feature: Design Foundation & UI Library Integration

## Why
To establish the visual identity and core UI control foundation required for a pixel-perfect implementation. This ensures consistent typography and reusable form controls across the monorepo using Spec-Driven Development.

## What
Integration of the **Circular Std** font family, installation of required UI libraries (`ng-select`, `@ng-bootstrap`), and the creation of a wrapped dropdown component within the `naologic-ds` library.

## Constraints

### Must
- Use the **Circular Std** font via the provided Naologic CDN link.
- Use **SCSS** for all styling.
- Wrap `ng-select` within the `naologic-ds` library for consistent consumption.
- Install `@ng-bootstrap/ng-bootstrap` for date-picking capabilities.
- Follow the `ControlValueAccessor` interface for the library wrapper to support Reactive Forms.

### Must Not
- Install additional UI frameworks like Angular Material or PrimeNG.
- Host font files locally; use the specified link.

### Out of Scope
- Implementation of the timeline grid logic.
- Overlap detection or work order business logic.

## Current State
- Angular CLI Monorepo structure: `naologic-techtest` (App) and `naologic-ds` (Library).
- Standard Angular 21 configuration with SCSS.
- No design tokens or third-party UI libraries currently integrated.

## Tasks

### T1: Install Visual Dependencies
**What:** Install `@ng-select/ng-select`, `@ng-bootstrap/ng-bootstrap`, and `bootstrap` via npm so its compatible with `naologic-ds` and `naologic-techtest`.
**Files:** `package.json`
**Verify:** Both packages precent on the package.json 

### T2: Typography & Global Styles Setup
**What:** Add the Circular Std link to the app's index.html and set global font/bootstrap styles.

**Files:**: `projects/naologic-techtest/src/index.html` `apps/naologic-techtest/src/styles.scss`

**Verify:**: Inspect the body element in browser dev tools to confirm font-family is applied.
