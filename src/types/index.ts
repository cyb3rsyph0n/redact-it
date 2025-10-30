/**
 * Configuration for a single filter that matches property names
 */
export interface FilterConfig {
  /** The search pattern - can be a string or RegExp */
  search: string | RegExp;
  /** The replacement text (defaults to '[REDACTED]') */
  replace?: string;
}

/**
 * Options for configuring the redaction behavior
 */
export interface RedactOptions {
  /** Whether to recursively scan nested objects and arrays (default: false) */
  deepScan?: boolean;
  /** Whether pattern matching is case sensitive (default: false) */
  caseSensitive?: boolean;
  /** Custom filters that replace the default filters entirely */
  filters?: (FilterConfig | string)[];
  /** Additional filters that are combined with the default filters */
  additionalFilters?: (FilterConfig | string)[];
}

/**
 * Type for input data that can be redacted
 */
export type RedactableInput = Record<string, any> | Record<string, any>[];

/**
 * Built-in filter names
 */
export type DefaultFilterName = 'email' | 'phone' | 'ssn';

/**
 * Internal representation of a compiled filter
 */
export interface CompiledFilter {
  /** The compiled pattern for matching */
  pattern: RegExp;
  /** The replacement text */
  replace: string;
}
