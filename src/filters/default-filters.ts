import { FilterConfig, DefaultFilterName } from '../types';

/**
 * Default filters for common sensitive property names
 */
export const DEFAULT_FILTERS: Record<DefaultFilterName, FilterConfig> = {
  email: {
    search: /^.*email.*$/i,
    replace: '[REDACTED]',
  },
  phone: {
    search: /^.*(phone|mobile|cell|telephone).*$/i,
    replace: '[REDACTED]',
  },
  ssn: {
    search: /^.*(ssn|social.*security|socialsecurity).*$/i,
    replace: '[REDACTED]',
  },
};

/**
 * Get the default filter configurations as an array
 */
export function getDefaultFilters(): FilterConfig[] {
  return Object.values(DEFAULT_FILTERS);
}

/**
 * Get a specific default filter by name
 */
export function getDefaultFilter(name: DefaultFilterName): FilterConfig {
  const filter = DEFAULT_FILTERS[name];
  if (!filter) {
    throw new Error(`Unknown default filter: ${name}`);
  }
  return filter;
}

/**
 * Check if a string represents a valid default filter name
 */
export function isDefaultFilterName(name: string): name is DefaultFilterName {
  return name in DEFAULT_FILTERS;
}
