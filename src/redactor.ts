import { RedactOptions, RedactableInput, FilterConfig, CompiledFilter } from './types';
import {
  getDefaultFilters,
  getDefaultFilter,
  isDefaultFilterName,
} from './filters/default-filters';

/**
 * Compile a filter configuration into a usable pattern
 */
function compileFilter(filter: FilterConfig | string, caseSensitive: boolean): CompiledFilter {
  let config: FilterConfig;

  if (typeof filter === 'string') {
    if (isDefaultFilterName(filter)) {
      config = getDefaultFilter(filter);
    } else {
      throw new Error(`Unknown default filter: ${filter}`);
    }
  } else {
    config = filter;
  }

  let pattern: RegExp;

  if (config.search instanceof RegExp) {
    // If it's already a RegExp, create a new one with appropriate flags
    const flags = caseSensitive
      ? config.search.flags.replace('i', '')
      : config.search.flags.includes('i')
        ? config.search.flags
        : config.search.flags + 'i';
    pattern = new RegExp(config.search.source, flags);
  } else {
    // If it's a string, create a RegExp with appropriate case sensitivity
    const flags = caseSensitive ? '' : 'i';
    pattern = new RegExp(config.search, flags);
  }

  return {
    pattern,
    replace: config.replace || '[REDACTED]',
  };
}

/**
 * Check if a property name matches any of the compiled filters
 */
function shouldRedactProperty(
  propertyName: string,
  compiledFilters: CompiledFilter[]
): string | null {
  for (const filter of compiledFilters) {
    if (filter.pattern.test(propertyName)) {
      return filter.replace;
    }
  }
  return null;
}

/**
 * Recursively redact an object or array
 */
function redactRecursive(
  data: any,
  compiledFilters: CompiledFilter[],
  deepScan: boolean,
  visited = new WeakSet()
): any {
  // Handle null/undefined
  if (data === null || data === undefined) {
    return data;
  }

  // Handle primitive types
  if (typeof data !== 'object') {
    return data;
  }

  // Prevent infinite recursion on circular references
  if (visited.has(data)) {
    return data;
  }

  // Add to visited set
  visited.add(data);

  // Handle arrays
  if (Array.isArray(data)) {
    const result = data.map(item => {
      if (deepScan && typeof item === 'object' && item !== null) {
        return redactRecursive(item, compiledFilters, deepScan, visited);
      }
      return redactRecursive(item, compiledFilters, false, visited);
    });

    // Remove from visited set for arrays since they don't have property names to redact
    visited.delete(data);
    return result;
  }

  // Handle objects
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    const replacement = shouldRedactProperty(key, compiledFilters);

    if (replacement !== null) {
      // Property name matches a filter, redact the value
      result[key] = replacement;
    } else if (deepScan && typeof value === 'object' && value !== null) {
      // Property doesn't match, but we should deep scan the value
      result[key] = redactRecursive(value, compiledFilters, deepScan, visited);
    } else {
      // Property doesn't match and no deep scan, keep original value
      result[key] = value;
    }
  }

  return result;
}

/**
 * Main redaction function
 */
export function redactIt<T extends RedactableInput>(data: T, options: RedactOptions = {}): T {
  const { deepScan = false, caseSensitive = false, filters, additionalFilters = [] } = options;

  // Determine which filters to use
  let filtersToUse: (FilterConfig | string)[];

  if (filters !== undefined) {
    // Use custom filters only
    filtersToUse = filters;
  } else {
    // Use default filters plus any additional filters
    filtersToUse = [...getDefaultFilters(), ...additionalFilters];
  }

  // Compile all filters
  const compiledFilters = filtersToUse.map(filter => compileFilter(filter, caseSensitive));

  // Perform redaction
  return redactRecursive(data, compiledFilters, deepScan) as T;
}
