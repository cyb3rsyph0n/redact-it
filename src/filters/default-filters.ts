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
  creditCard: {
    search: /^.*(credit.*card|card.*number|cc.*number|payment.*card|card.*info).*$/i,
    replace: '[REDACTED]',
  },
  driverLicense: {
    search: /^.*(driver.*license|license.*number|dl.*number|driving.*license|drivers.*license).*$/i,
    replace: '[REDACTED]',
  },
  passport: {
    search: /^.*(passport|passport.*number|passport.*id).*$/i,
    replace: '[REDACTED]',
  },
  ipAddress: {
    search: /^.*(ip.*address|client.*ip|remote.*ip|user.*ip|ip).*$/i,
    replace: '[REDACTED]',
  },
  password: {
    search: /^.*(password|passwd|pwd|token|api.*key|secret|auth.*token|access.*token|bearer.*token).*$/i,
    replace: '[REDACTED]',
  },
  bankAccount: {
    search: /^.*(account.*number|bank.*account|routing.*number|iban|bank.*number|account.*info).*$/i,
    replace: '[REDACTED]',
  },
  dateOfBirth: {
    search: /^.*(date.*of.*birth|birth.*date|dob|birthday|birth.*day).*$/i,
    replace: '[REDACTED]',
  },
  taxId: {
    search: /^.*(tax.*id|ein|taxpayer.*id|federal.*id|tax.*number).*$/i,
    replace: '[REDACTED]',
  },
  medicalRecord: {
    search: /^.*(medical.*record|mrn|patient.*id|health.*id|medical.*number).*$/i,
    replace: '[REDACTED]',
  },
  nationalId: {
    search: /^.*(national.*id|citizen.*id|personal.*id|government.*id|identity.*number).*$/i,
    replace: '[REDACTED]',
  },
  deviceId: {
    search: /^.*(device.*id|device.*identifier|device.*token|imei|android.*id|udid|uuid|hardware.*id|device.*fingerprint).*$/i,
    replace: '[REDACTED]',
  },
  macAddress: {
    search: /^.*(mac.*address|device.*mac|wifi.*mac|ethernet.*mac|bluetooth.*mac).*$/i,
    replace: '[REDACTED]',
  },
  biometric: {
    search: /^.*(biometric|fingerprint|face.*id|facial.*id|iris.*scan|retina.*scan|voice.*print|dna|palm.*scan).*$/i,
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
