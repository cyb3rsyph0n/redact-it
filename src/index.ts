// Main exports
export { redactIt } from './redactor';

// Type exports
export type {
  RedactOptions,
  FilterConfig,
  RedactableInput,
  DefaultFilterName,
  CompiledFilter,
} from './types';

// Filter utilities
export {
  getDefaultFilters,
  getDefaultFilter,
  isDefaultFilterName,
  DEFAULT_FILTERS,
} from './filters/default-filters';

// Default export
export { redactIt as default } from './redactor';
