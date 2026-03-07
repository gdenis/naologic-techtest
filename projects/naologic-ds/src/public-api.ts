/*
 * Public API Surface of naologic-ds
 */

// Example: For Angular i18n
// Source - https://stackoverflow.com/a/79507792
// Posted by Stephane Janicaud, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-07, License - CC BY-SA 4.0

/// <reference types="@angular/localize" />


export * from './lib/components/timeline-action-button/timeline-action-button';
export * from './lib/models/work-center.model';
export * from './lib/models/work-order.model';
export * from './lib/models/status.enum';

// Export SCSS tokens (for use in component stylesheets)
// Note: Import in components as: @import '@naologic-ds/styles/tokens';
