# Plan: Work Order Schedule Timeline - Complete Breakdown

**TL;DR**: Build a manufacturing timeline component in naologic-techtest with reusable UI components extracted to naologic-ds. Work in 3 phases: (1) Foundation & Models rarr; (2) Reusable Components Library rarr; (3) Timeline Grid, Interactions & Polish.

---

### **Architecture Overview**

```
naologic-ds (Library)
├── Button (reusable)
├── Badge (reusable)
├── Dropdown Menu (reusable)
├── Form Panel Wrapper (reusable)
├── Datepicker Wrapper (reusable)
└── Public API export

naologic-techtest (Main App)
├── Services
│   ├── work-order.service.ts (API calls + state)
│   └── work-center.service.ts (API calls + state)
├── Models
│   ├── work-order.model.ts
│   └── work-center.model.ts
├── Components
│   └── timeline/
│       ├── timeline-main.component.ts (container)
│       ├── timeline-grid.component.ts (layout)
│       ├── timeline-header.component.ts (dates/zoom)
│       ├── work-order-bar.component.ts (bar + menu)
│       ├── create-edit-panel.component.ts (form)
│       └── scss/ (styles)
└── Data
    └── sample-data.ts (hardcoded fallback)

Backend (json-server)
└── db.json (seeded with 5+ work centers, 8+ work orders)
```

---

### **8 Implementation Specs**

| Phase | Spec | Title | Dependencies |
|-------|------|-------|--------------|
| **1: Foundation** | 1 | Data Models & Backend Setup - library models | None |
| | 2 | Reusable Components (naologic-ds) | Spec 1 |
| **2: Timeline Grid** | 3 | Timeline Grid Layout & Zoom | Spec 2 |
| | 4 | Timeline Header & Date Navigation | Spec 3 |
| | 5 | Work Order Bars & Positioning | Spec 3, 4 |
| **3: Interactions** | 6 | Work Order Actions (Edit/Delete) | Spec 5 |
| | 7 | Create/Edit Panel & Validation | Spec 5, 6 |
| **4: Polish & QA** | 8 | Accessibility, Testing & Polish | Specs 3-7 |

---

### **Execution Flow**

```
Spec 1 (Models & Backend)
    darr;
Specs 2 (UI Components) + Spec 3 (Grid Layout)  [can start in parallel]
    darr;
Specs 4 (Headers) + Spec 5 (Bars)  [parallel, both need Spec 3]
    darr;
Specs 6 (Actions) + Spec 7 (Forms)  [parallel, both need Spec 5]
    darr;
Spec 8 (Testing & Polish)
```

---

### **Key Design Decisions** (locked in)

- **Component home**: Timeline main component lives in naologic-techtest (main app focus); reusable UI in naologic-ds
- **State**: Use signals in services, NOT Redux/NgRx (simpler for this scope)
- **Data**: All HTTP via services with HttpClient (keep components dumb)
- **Forms**: Reactive Forms with FormGroup + validation
- **Overlap detection**: Calculated on form submit (not live validation)
- **Zoom support**: Day/Week/Month only (not Hour)
- **Persistence**: json-server backend (localStorage is v2+)

---

### **Success Criteria per Spec**

1. ✅ Backend seeded, API calls work
2. ✅ Each reusable component renders in isolation
3. ✅ Grid layout + scroll works horizontally (left panel fixed)
4. ✅ Headers render correctly for each zoom level
5. ✅ Work order bars visible at correct dates + colors
6. ✅ Three-dot menu functional, delete removes orders
7. ✅ Form validates, detects overlaps, saves successfully
8. ✅ AXE audit: 0 critical issues, all E2E tests pass

---

### **What's NOT Included (v1)**

- Drag-to-resize work orders
- Multi-select / bulk operations
- Export/Print functionality
- Real-time sync (WebSocket)