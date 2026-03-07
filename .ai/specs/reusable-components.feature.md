# Reusable Components for Timeline

## Why

The Work Order Schedule Timeline requires a consistent, accessible, and maintainable component library. Building timeline-specific reusable components in `naologic-ds` eliminates code duplication, enforces design system compliance, and ensures WCAG AA accessibility standards are met across all user interactions.

## What

Create six timeline-specific, reusable components in `naologic-ds` (action button, status badge, dropdown menu, form panel wrapper, datepicker wrapper) plus design tokens and status metadata. All components must be standalone, use OnPush change detection, include >85% unit test coverage, and pass AXE accessibility audits. Components are exported via the library's public API.

## Constraints

### Must

- Standalone components with `changeDetection: ChangeDetectionStrategy.OnPush`
- Design tokens in SCSS variables; reusable across monorepo projects
- Unit tests >85% coverage minimum; use Jasmine/Karma
- WCAG AA color contrast compliance verified
- Use `input()`/`output()` functions instead of `@Input`/`@Output` decorators
- Use specified libraries only: `@angular/material`, `@ng-select/ng-select`, `@ng-bootstrap/ng-bootstrap`
- Export all components and tokens via `projects/naologic-ds/src/public-api.ts`

### Must Not

- Do not create the timeline grid layout (out of scope for this spec)
- Do not install new dependencies beyond Material, ng-select, ng-bootstrap
- Do not modify existing CRUD services or models
- Do not use `@HostBinding` / `@HostListener` decorators; use `host` object instead
- Do not use `*ngIf`, `*ngFor`, `*ngSwitch`; use native control flow (`@if`, `@for`, `@switch`)

### Out of Scope

- Timeline grid layout and zoom functionality
- Timeline header and date navigation
- Work order bar positioning and rendering
- Create/edit panel (forms use the wrapper component, but panel is separate)
- End-to-end test coverage (unit tests only)

## Current State

**Completed (Spec 1):**

- `WorkCenterDocument` and `WorkOrderDocument` models in `projects/naologic-ds/src/lib/models/`
- CRUD services (`WorkCenterService`, `WorkOrderService`) in main app
- json-server seeded with 5 work centers and 8 work orders on localhost:3000

**Existing Structure:**

- `projects/naologic-ds/src/lib/` — Library source folder structure exists
- `projects/naologic-ds/src/public-api.ts` — Barrel export file for library API
- SCSS preprocessing enabled; no additional configuration needed

**Required Dependencies (already installed):**

- `@angular/material` v21+
- `@ng-select/ng-select` v20+
- `@ng-bootstrap/ng-bootstrap` v18+

## Tasks

### T1: Design Tokens & Status Enum

**What:** Create SCSS design tokens (colors, spacing, typography, borders) and `WorkOrderStatusMeta` enum for status-based theming. Tokens should be reusable across all timeline components and future monorepo projects.

**Files:**

- `projects/naologic-ds/src/lib/styles/tokens.scss` — Design token variables (status colors, semantic colors, typography, spacing, borders)
- `projects/naologic-ds/src/lib/models/status.enum.ts` — `WorkOrderStatusMeta` object with labels and colors
- `projects/naologic-ds/src/public-api.ts` — Add exports for tokens and enum

**Verify:**

- Run `npm run build:ds` — library builds without errors
- In any component, import and use: `@import '@naologic-ds/styles/tokens'` — SCSS variables resolve
- Import enum: `import { WorkOrderStatusMeta } from '@naologic-ds'` — TypeScript strict mode passes
- Enum exports: `{ open: { label: 'Open', color: ... }, 'in-progress': {...}, ... }`

---

### T2: TimelineActionButton Component

**What:** Create a standalone button component with three variants (primary, secondary, danger). Used for timeline interactions: edit, delete, create work orders. Component includes keyboard navigation, ARIA attributes, and hover/disabled states.

**Files:**

- `projects/naologic-ds/src/lib/components/timeline-action-button/timeline-action-button.ts`
- `projects/naologic-ds/src/lib/components/timeline-action-button/timeline-action-button.html`
- `projects/naologic-ds/src/lib/components/timeline-action-button/timeline-action-button.scss`
- `projects/naologic-ds/src/lib/components/timeline-action-button/timeline-action-button.spec.ts` (>90% coverage)

**Verify:**

- Run `npm test -- timeline-action-button.spec.ts` — 4+ tests pass
- Tests verify: click emission, disabled state, keyboard Enter key, ARIA labels
- Build: `npm run build:ds` succeeds
- Import in app: `import { TimelineActionButton } from '@naologic-ds'` works
- Component renders with variant styling applied

---

### T3: WorkOrderStatusBadge Component

**What:** Create a pill-shaped status badge component that displays work order status with color-coded background. Supports three sizes (sm, md, lg) and optional custom color override. Colors matched to Sketch design mockups.

**Files:**

- `projects/naologic-ds/src/lib/components/work-order-status-badge/work-order-status-badge.ts`
- `projects/naologic-ds/src/lib/components/work-order-status-badge/work-order-status-badge.html`
- `projects/naologic-ds/src/lib/components/work-order-status-badge/work-order-status-badge.scss`
- `projects/naologic-ds/src/lib/components/work-order-status-badge/work-order-status-badge.spec.ts` (>90% coverage)

**Verify:**

- Run `npm test -- work-order-status-badge.spec.ts` — 5+ tests pass
- Tests verify: correct label per status, colors apply, size variants, custom color override, WCAG contrast ratio ≥ 4.5:1
- Build: `npm run build:ds` succeeds
- All 4 statuses display with correct colors in browser
- Contrast validation: use WebAIM tool or axe-core to verify WCAG AA compliance

---

### T4: TimelineDropdownMenu Component

**What:** Create a wrapper around `ng-select` for dropdowns used in timeline operations (status selection, work center selection). Fully keyboard accessible with ARIA labels and keyboard navigation (Arrow Up/Down, Enter).

**Files:**

- `projects/naologic-ds/src/lib/components/timeline-dropdown-menu/timeline-dropdown-menu.ts`
- `projects/naologic-ds/src/lib/components/timeline-dropdown-menu/timeline-dropdown-menu.html`
- `projects/naologic-ds/src/lib/components/timeline-dropdown-menu/timeline-dropdown-menu.scss`
- `projects/naologic-ds/src/lib/components/timeline-dropdown-menu/timeline-dropdown-menu.spec.ts` (>85% coverage)

**Verify:**

- Run `npm test -- timeline-dropdown-menu.spec.ts` — 4+ tests pass
- Tests verify: selection emits, keyboard navigation (Arrow keys), ARIA attributes, disabled state
- Build: `npm run build:ds` succeeds
- Keyboard-only navigation works in browser: Tab to focus, Arrow keys to navigate, Enter to select
- Options searchable via keyboard (ng-select default behavior)

---

### T5: TimelineFormPanelWrapper Component

**What:** Create a wrapper component for Material form fields used in create/edit panels. Provides unified styling and error handling for form inputs (text, date, select). Integrates with Reactive Forms FormControl.

**Files:**

- `projects/naologic-ds/src/lib/components/timeline-form-panel-wrapper/timeline-form-panel-wrapper.ts`
- `projects/naologic-ds/src/lib/components/timeline-form-panel-wrapper/timeline-form-panel-wrapper.html`
- `projects/naologic-ds/src/lib/components/timeline-form-panel-wrapper/timeline-form-panel-wrapper.scss`
- `projects/naologic-ds/src/lib/components/timeline-form-panel-wrapper/timeline-form-panel-wrapper.spec.ts` (>80% coverage)

**Verify:**

- Run `npm test -- timeline-form-panel-wrapper.spec.ts` — 3+ tests pass
- Tests verify: error state displays when invalid, error message renders, disabled state applied
- Build: `npm run build:ds` succeeds
- In app: form shows Material styling, error messages appear on invalid/touched, disabled inputs work

---

### T6: TimelineDatepickerWrapper Component

**What:** Create a wrapper around `@ng-bootstrap/ng-bootstrap` datepicker for consistent date selection across timeline. Supports min/max date constraints and keyboard navigation.

**Files:**

- `projects/naologic-ds/src/lib/components/timeline-datepicker-wrapper/timeline-datepicker-wrapper.ts`
- `projects/naologic-ds/src/lib/components/timeline-datepicker-wrapper/timeline-datepicker-wrapper.html`
- `projects/naologic-ds/src/lib/components/timeline-datepicker-wrapper/timeline-datepicker-wrapper.scss`
- `projects/naologic-ds/src/lib/components/timeline-datepicker-wrapper/timeline-datepicker-wrapper.spec.ts` (>85% coverage)

**Verify:**

- Run `npm test -- timeline-datepicker-wrapper.spec.ts` — 3+ tests pass
- Tests verify: date selection emits, min/max constraints enforced, disabled state functional
- Build: `npm run build:ds` succeeds
- In app: datepicker popup opens on click, dates outside min/max are disabled, keyboard navigation works

## Validation

After all tasks complete, run these end-to-end checks:

- **Library Build:** `npm run build:ds` — zero errors, zero warnings
- **Unit Tests:** `npm test -- naologic-ds` — all tests pass (6 specs, >85% avg coverage)
- **Accessibility Audit:** Use axe-core or Chrome DevTools to verify AXE compliance on each component:
  - No color contrast violations (WCAG AA minimum 4.5:1)
  - All interactive elements keyboard accessible
  - ARIA labels and roles correct
- **Public API Export:** Run in app console: `import { TimelineActionButton, WorkOrderStatusBadge, ... } from '@naologic-ds'` — all imports resolve
- **Manual Verification:**
  - TimelineActionButton: click, disabled state, keyboard Enter key
  - WorkOrderStatusBadge: all 4 statuses rendered with correct colors and text
  - TimelineDropdownMenu: arrow key navigation, selection emission
  - TimelineFormPanelWrapper: Material styling, error display
  - TimelineDatepickerWrapper: datepicker popup, date constraints
