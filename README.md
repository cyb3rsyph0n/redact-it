# @nurv-llc/redact-it

A TypeScript library for redacting sensitive information from objects and arrays by matching property names against configurable filters.

[![CI](https://github.com/cyb3rsyph0n/redact-it/workflows/CI/badge.svg)](https://github.com/cyb3rsyph0n/redact-it/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@nurv-llc%2Fredact-it.svg)](https://badge.fury.io/js/@nurv-llc%2Fredact-it)
[![codecov](https://codecov.io/gh/cyb3rsyph0n/redact-it/branch/master/graph/badge.svg)](https://codecov.io/gh/cyb3rsyph0n/redact-it)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @nurv-llc/redact-it
```

## Quick Start

```typescript
import { redactIt } from '@nurv-llc/redact-it';

const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  phoneNumber: '555-123-4567',
  address: '123 Main St',
};

const redacted = redactIt(userData);
console.log(redacted);
// Output: {
//   name: 'John Doe',
//   email: '[REDACTED]',
//   phoneNumber: '[REDACTED]',
//   address: '123 Main St'
// }
```

### More Examples

```typescript
// Example with various PII types
const sensitiveData = {
  name: 'Jane Smith',
  email: 'jane@company.com',
  creditCard: '4111-1111-1111-1111',
  driverLicense: 'DL123456789',
  dateOfBirth: '1990-01-15',
  passport: 'US123456789',
  apiKey: 'sk_live_abc123xyz',
  ipAddress: '192.168.1.100',
  bankAccount: '12345678901',
  taxId: '12-3456789',
  medicalRecord: 'MRN987654321',
  nationalId: 'SSN123-45-6789'
};

const redacted = redactIt(sensitiveData);
console.log(redacted);
// Output: {
//   name: 'Jane Smith',
//   email: '[REDACTED]',
//   creditCard: '[REDACTED]',
//   driverLicense: '[REDACTED]',
//   dateOfBirth: '[REDACTED]',
//   passport: '[REDACTED]',
//   apiKey: '[REDACTED]',
//   ipAddress: '[REDACTED]',
//   bankAccount: '[REDACTED]',
//   taxId: '[REDACTED]',
//   medicalRecord: '[REDACTED]',
//   nationalId: '[REDACTED]'
// }
```

## How It Works

`redact-it` searches for **property names** (keys) that match sensitive data patterns and replaces their **values** with redaction text. By default, it looks for properties that indicate:

- **Email addresses**: `email`, `emailAddress`, `userEmail`, etc.
- **Phone numbers**: `phone`, `phoneNumber`, `mobile`, `cellPhone`, etc.
- **Social Security Numbers**: `ssn`, `socialSecurityNumber`, `socialSecurity`, etc.
- **Credit Card Information**: `creditCard`, `cardNumber`, `ccNumber`, etc.
- **Driver's License**: `driverLicense`, `licenseNumber`, `dlNumber`, etc.
- **Passport Information**: `passport`, `passportNumber`, `passportId`, etc.
- **IP Addresses**: `ipAddress`, `clientIp`, `remoteIp`, etc.
- **Passwords & Secrets**: `password`, `token`, `apiKey`, `secret`, etc.
- **Bank Account Info**: `accountNumber`, `bankAccount`, `routingNumber`, etc.
- **Date of Birth**: `dateOfBirth`, `birthDate`, `dob`, etc.
- **Tax IDs**: `taxId`, `ein`, `taxpayerId`, etc.
- **Medical Records**: `medicalRecord`, `mrn`, `patientId`, etc.
- **National IDs**: `nationalId`, `citizenId`, `personalId`, etc.

## API Reference

### `redactIt(data, options?)`

Redacts sensitive information from an object or array of objects.

**Parameters:**

- `data: Record<string, any> | Record<string, any>[]` - The object or array to redact
- `options?: RedactOptions` - Configuration options

**Returns:** The redacted data with the same structure as input

### RedactOptions

```typescript
interface RedactOptions {
  deepScan?: boolean; // Default: false
  caseSensitive?: boolean; // Default: false
  filters?: (FilterConfig | string)[];
  additionalFilters?: (FilterConfig | string)[];
}
```

### FilterConfig

```typescript
interface FilterConfig {
  search: string | RegExp; // Pattern to match property names
  replace?: string; // Replacement text (default: '[REDACTED]')
}
```

## Configuration Options

### `deepScan` (default: `false`)

Controls whether to recursively scan nested objects and arrays.

```typescript
const data = {
  user: {
    email: 'user@example.com',
    profile: {
      workEmail: 'work@company.com',
    },
  },
};

// Default behavior - only top level
redactIt(data);
// Output: {
//   user: {
//     email: 'user@example.com',
//     profile: { workEmail: 'work@company.com' }
//   }
// }

// Deep scan enabled
redactIt(data, { deepScan: true });
// Output: {
//   user: {
//     email: '[REDACTED]',
//     profile: { workEmail: '[REDACTED]' }
//   }
// }
```

### `caseSensitive` (default: `false`)

Controls whether property name matching is case-sensitive.

```typescript
const data = {
  EMAIL: 'user@example.com',
  email: 'user2@example.com',
  Phone: '555-0123',
};

// Case insensitive (default)
redactIt(data);
// Output: {
//   EMAIL: '[REDACTED]',
//   email: '[REDACTED]',
//   Phone: '[REDACTED]'
// }

// Case sensitive
redactIt(data, { caseSensitive: true });
// Output: {
//   EMAIL: 'user@example.com',    // No match - EMAIL ≠ email
//   email: '[REDACTED]',          // Match
//   Phone: '555-0123'             // No match - Phone ≠ phone
// }
```

### `filters`

Replace default filters entirely with custom ones.

```typescript
const data = {
  email: 'user@example.com',
  password: 'secret123',
  apiKey: 'abc-def-123',
};

redactIt(data, {
  filters: [
    { search: 'password', replace: '[HIDDEN]' },
    { search: /.*key.*$/i, replace: '[SECRET]' },
    'email', // Reference to default email filter
  ],
});
// Output: {
//   email: '[REDACTED]',
//   password: '[HIDDEN]',
//   apiKey: '[SECRET]'
// }
```

### `additionalFilters`

Add custom filters while keeping default ones.

```typescript
const data = {
  email: 'user@example.com', // Matched by default email filter
  phone: '555-0123', // Matched by default phone filter
  password: 'secret123', // Matched by additional filter
  creditCard: '4111-1111-1111-1111',
};

redactIt(data, {
  additionalFilters: [
    { search: 'password', replace: '[HIDDEN]' },
    { search: /credit.*card/i, replace: '[PAYMENT_INFO]' },
  ],
});
// Output: {
//   email: '[REDACTED]',
//   phone: '[REDACTED]',
//   password: '[HIDDEN]',
//   creditCard: '[PAYMENT_INFO]'
// }
```

## Advanced Examples

### Working with Arrays

```typescript
const users = [
  { name: 'John', email: 'john@test.com', role: 'admin' },
  { name: 'Jane', mobile: '555-0123', role: 'user' },
];

const redacted = redactIt(users);
console.log(redacted);
// Output: [
//   { name: 'John', email: '[REDACTED]', role: 'admin' },
//   { name: 'Jane', mobile: '[REDACTED]', role: 'user' }
// ]
```

### Complex Nested Structures

```typescript
const complexData = {
  company: 'ACME Corp',
  employees: [
    {
      id: 1,
      profile: {
        name: 'John Doe',
        contactInfo: {
          email: 'john@acme.com',
          phone: '555-0001',
        },
      },
    },
    {
      id: 2,
      profile: {
        name: 'Jane Smith',
        contactInfo: {
          workEmail: 'jane@acme.com',
          mobile: '555-0002',
        },
      },
    },
  ],
};

const redacted = redactIt(complexData, { deepScan: true });
console.log(redacted);
// Output: {
//   company: 'ACME Corp',
//   employees: [
//     {
//       id: 1,
//       profile: {
//         name: 'John Doe',
//         contactInfo: {
//           email: '[REDACTED]',
//           phone: '[REDACTED]'
//         }
//       }
//     },
//     {
//       id: 2,
//       profile: {
//         name: 'Jane Smith',
//         contactInfo: {
//           workEmail: '[REDACTED]',
//           mobile: '[REDACTED]'
//         }
//       }
//     }
//   ]
// }
```

### Custom Regex Patterns

```typescript
const data = {
  customerEmail: 'customer@example.com',
  internalEmail: 'internal@company.com',
  userPhone: '555-0123',
  emergencyContact: '911',
  apiToken: 'tok_abc123',
  refreshToken: 'ref_xyz789',
};

redactIt(data, {
  filters: [
    // Only match email properties ending with 'Email' (case insensitive)
    { search: /.*email$/i, replace: '[EMAIL_REDACTED]' },
    // Match any property containing 'token'
    { search: /.*token.*/i, replace: '[TOKEN_REDACTED]' },
    // Exact match for specific property
    { search: 'emergencyContact', replace: '[EMERGENCY_REDACTED]' },
  ],
});
// Output: {
//   customerEmail: '[EMAIL_REDACTED]',
//   internalEmail: '[EMAIL_REDACTED]',
//   userPhone: '555-0123',              // Not matched by custom filters
//   emergencyContact: '[EMERGENCY_REDACTED]',
//   apiToken: '[TOKEN_REDACTED]',
//   refreshToken: '[TOKEN_REDACTED]'
// }
```

## Default Filters

The library includes thirteen built-in filters for common PII types:

| Filter           | Pattern Examples                                           | Matches                                                                              |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `email`          | `/^.*email.*$/i`                                           | `email`, `emailAddress`, `userEmail`, `contactEmail`, etc.                          |
| `phone`          | `/^.*(phone\|mobile\|cell\|telephone).*$/i`                | `phone`, `mobile`, `cellPhone`, `telephone`, etc.                                   |
| `ssn`            | `/^.*(ssn\|social.*security\|socialsecurity).*$/i`        | `ssn`, `socialSecurityNumber`, `social_security`, etc.                              |
| `creditCard`     | `/^.*(credit.*card\|card.*number\|cc.*number).*$/i`       | `creditCard`, `cardNumber`, `ccNumber`, `paymentCard`, etc.                         |
| `driverLicense`  | `/^.*(driver.*license\|license.*number\|dl.*number).*$/i` | `driverLicense`, `licenseNumber`, `dlNumber`, `drivingLicense`, etc.                |
| `passport`       | `/^.*(passport\|passport.*number\|passport.*id).*$/i`     | `passport`, `passportNumber`, `passportId`, etc.                                    |
| `ipAddress`      | `/^.*(ip.*address\|client.*ip\|remote.*ip\|user.*ip).*$/i`| `ipAddress`, `clientIp`, `remoteIp`, `userIp`, `ip`, etc.                           |
| `password`       | `/^.*(password\|passwd\|pwd\|token\|secret).*$/i`         | `password`, `token`, `apiKey`, `secret`, `authToken`, `accessToken`, etc.           |
| `bankAccount`    | `/^.*(account.*number\|bank.*account\|routing.*number).*$/i`| `accountNumber`, `bankAccount`, `routingNumber`, `iban`, etc.                       |
| `dateOfBirth`    | `/^.*(date.*of.*birth\|birth.*date\|dob\|birthday).*$/i`  | `dateOfBirth`, `birthDate`, `dob`, `birthday`, etc.                                 |
| `taxId`          | `/^.*(tax.*id\|ein\|taxpayer.*id\|federal.*id).*$/i`      | `taxId`, `ein`, `taxpayerId`, `federalId`, `taxNumber`, etc.                        |
| `medicalRecord`  | `/^.*(medical.*record\|mrn\|patient.*id\|health.*id).*$/i`| `medicalRecord`, `mrn`, `patientId`, `healthId`, `medicalNumber`, etc.              |
| `nationalId`     | `/^.*(national.*id\|citizen.*id\|personal.*id).*$/i`      | `nationalId`, `citizenId`, `personalId`, `governmentId`, `identityNumber`, etc.     |

All filters are case-insensitive and match property names containing the specified patterns.

## TypeScript Support

The library is written in TypeScript and includes full type definitions:

```typescript
import { redactIt, RedactOptions, FilterConfig } from '@nurv-llc/redact-it';

// Type-safe options
const options: RedactOptions = {
  deepScan: true,
  caseSensitive: false,
  additionalFilters: [{ search: 'password', replace: '[HIDDEN]' }],
};

// Input and output maintain type structure
interface User {
  name: string;
  email: string;
  phone: string;
}

const user: User = {
  name: 'John',
  email: 'john@test.com',
  phone: '555-0123',
};

const redactedUser: User = redactIt(user);
```

## Error Handling

The library will throw errors for invalid configurations:

```typescript
// Error: Unknown default filter
redactIt(data, { filters: ['invalidFilter'] });

// Error: Invalid filter configuration
redactIt(data, { filters: [{ search: null }] });
```

## Performance Considerations

- **Circular References**: The library handles circular references safely without infinite loops
- **Large Objects**: For very large objects with deep nesting, consider using `deepScan: false` if you only need top-level redaction
- **Filter Complexity**: Simple string filters are faster than complex regex patterns

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Development

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Setup

```bash
git clone https://github.com/cyb3rsyph0n/redact-it.git
cd redact-it
npm install
```

### Scripts

```bash
npm run build          # Build the project
npm run test           # Run tests
npm run test:coverage  # Run tests with coverage
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting
npm run type-check     # Run TypeScript compiler check
```

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Format your code (`npm run format`)
7. Commit your changes using conventional commits
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

## Support

- GitHub Issues: [Report bugs or request features](https://github.com/nurv-llc/redact-it/issues)
- Documentation: [Full API documentation](https://github.com/nurv-llc/redact-it#readme)
