import { redactIt } from './redactor';
import { RedactOptions } from './types';

describe('redactIt', () => {
  describe('basic functionality', () => {
    it('should redact properties matching default filters', () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '555-123-4567',
        ssn: '123-45-6789',
        address: '123 Main St',
      };

      const result = redactIt(input);

      expect(result).toEqual({
        name: 'John Doe',
        email: '[REDACTED]',
        phoneNumber: '[REDACTED]',
        ssn: '[REDACTED]',
        address: '[REDACTED]',
      });
    });

    it('should handle array input', () => {
      const input = [
        { name: 'John', email: 'john@test.com' },
        { name: 'Jane', mobile: '555-0123' },
      ];

      const result = redactIt(input);

      expect(result).toEqual([
        { name: 'John', email: '[REDACTED]' },
        { name: 'Jane', mobile: '[REDACTED]' },
      ]);
    });

    it('should handle null and undefined values', () => {
      const input = {
        name: null,
        email: 'test@example.com',
        phone: undefined,
      };

      const result = redactIt(input);

      expect(result).toEqual({
        name: null,
        email: '[REDACTED]',
        phone: '[REDACTED]', // phone property name matches phone filter, so undefined value gets redacted
      });
    });

    it('should handle empty objects and arrays', () => {
      expect(redactIt({})).toEqual({});
      expect(redactIt([])).toEqual([]);
    });

    it('should redact address, postal code, and security answers', () => {
      const input = {
        addressLine1: '123 Main St',
        zipCode: '12345',
        postalCode: '12345-6789',
        securityQuestion: "What is your pet's name?",
        securityAnswer: 'Fluffy',
        motherMaidenName: 'Smith',
        shippingAddress: '234 Side Ave',
      };

      const result = redactIt(input);

      expect(result).toEqual({
        addressLine1: '[REDACTED]',
        zipCode: '[REDACTED]',
        postalCode: '[REDACTED]',
        securityQuestion: '[REDACTED]',
        securityAnswer: '[REDACTED]',
        motherMaidenName: '[REDACTED]',
        shippingAddress: '[REDACTED]',
      });
    });
  });

  describe('deepScan option', () => {
    it('should not scan nested objects by default', () => {
      const input = {
        user: {
          email: 'user@example.com',
          phone: '555-0123',
        },
        contactInfo: {
          workEmail: 'work@company.com',
        },
      };

      const result = redactIt(input);

      expect(result).toEqual({
        user: {
          email: 'user@example.com',
          phone: '555-0123',
        },
        contactInfo: {
          workEmail: 'work@company.com',
        },
      });
    });

    it('should scan nested objects when deepScan is true', () => {
      const input = {
        user: {
          email: 'user@example.com',
          phone: '555-0123',
        },
        contactInfo: {
          workEmail: 'work@company.com',
        },
      };

      const result = redactIt(input, { deepScan: true });

      expect(result).toEqual({
        user: {
          email: '[REDACTED]',
          phone: '[REDACTED]',
        },
        contactInfo: {
          workEmail: '[REDACTED]',
        },
      });
    });

    it('should scan nested arrays when deepScan is true', () => {
      const input = {
        users: [
          { name: 'John', email: 'john@test.com' },
          { name: 'Jane', mobile: '555-0123' },
        ],
      };

      const result = redactIt(input, { deepScan: true });

      expect(result).toEqual({
        users: [
          { name: 'John', email: '[REDACTED]' },
          { name: 'Jane', mobile: '[REDACTED]' },
        ],
      });
    });

    it('should handle deeply nested structures', () => {
      const input = {
        level1: {
          level2: {
            level3: {
              email: 'deep@example.com',
              phone: '555-9999',
            },
          },
        },
      };

      const result = redactIt(input, { deepScan: true });

      expect(result).toEqual({
        level1: {
          level2: {
            level3: {
              email: '[REDACTED]',
              phone: '[REDACTED]',
            },
          },
        },
      });
    });
  });

  describe('caseSensitive option', () => {
    it('should be case insensitive by default', () => {
      const input = {
        EMAIL: 'user@example.com',
        Phone: '555-0123',
        SSN: '123-45-6789',
      };

      const result = redactIt(input);

      expect(result).toEqual({
        EMAIL: '[REDACTED]',
        Phone: '[REDACTED]',
        SSN: '[REDACTED]',
      });
    });

    it('should be case sensitive when caseSensitive is true', () => {
      const input = {
        EMAIL: 'user@example.com',
        email: 'user2@example.com',
        Phone: '555-0123',
        phone: '555-0124',
      };

      const result = redactIt(input, { caseSensitive: true });

      expect(result).toEqual({
        EMAIL: 'user@example.com', // Should not match with case-sensitive
        email: '[REDACTED]',
        Phone: '555-0123', // Should not match with case-sensitive
        phone: '[REDACTED]',
      });
    });
  });

  describe('custom filters', () => {
    it('should use custom filters instead of defaults', () => {
      const input = {
        email: 'user@example.com',
        password: 'secret123',
        apiKey: 'abc123',
      };

      const options: RedactOptions = {
        filters: [
          { search: 'password', replace: '[HIDDEN]' },
          { search: /.*key.*$/i, replace: '[SECRET]' },
        ],
      };

      const result = redactIt(input, options);

      expect(result).toEqual({
        email: 'user@example.com', // Not redacted because custom filters don't include email
        password: '[HIDDEN]',
        apiKey: '[SECRET]',
      });
    });

    it('should support string filters referencing default filter names', () => {
      const input = {
        email: 'user@example.com',
        phone: '555-0123',
        password: 'secret123',
      };

      const options: RedactOptions = {
        filters: ['email', { search: 'password', replace: '[HIDDEN]' }],
      };

      const result = redactIt(input, options);

      expect(result).toEqual({
        email: '[REDACTED]',
        phone: '555-0123', // Not redacted because phone is not in custom filters
        password: '[HIDDEN]',
      });
    });

    it('should throw error for unknown default filter names', () => {
      const input = { test: 'value' };

      expect(() => {
        redactIt(input, { filters: ['unknownFilter'] });
      }).toThrow('Unknown default filter: unknownFilter');
    });
  });

  describe('additionalFilters option', () => {
    it('should combine additional filters with default filters', () => {
      const input = {
        email: 'user@example.com',
        phone: '555-0123',
        customField: 'secret123',
        internalData: 'abc123',
      };

      const options: RedactOptions = {
        additionalFilters: [
          { search: 'customField', replace: '[HIDDEN]' },
          { search: /.*internal.*$/i, replace: '[SECRET]' },
        ],
      };

      const result = redactIt(input, options);

      expect(result).toEqual({
        email: '[REDACTED]', // From default filters
        phone: '[REDACTED]', // From default filters
        customField: '[HIDDEN]', // From additional filters
        internalData: '[SECRET]', // From additional filters
      });
    });

    it('should support string references to default filters in additionalFilters', () => {
      const input = {
        email: 'user@example.com',
        customField: 'secret123',
      };

      const options: RedactOptions = {
        additionalFilters: [
          'email', // This will be ignored since email is already in defaults
          { search: 'customField', replace: '[HIDDEN]' },
        ],
      };

      const result = redactIt(input, options);

      expect(result).toEqual({
        email: '[REDACTED]',
        customField: '[HIDDEN]',
      });
    });
  });

  describe('edge cases', () => {
    it('should handle circular references', () => {
      const input: any = {
        name: 'John',
        email: 'john@example.com',
      };
      input.self = input; // Create circular reference

      const result = redactIt(input, { deepScan: true });

      expect(result.name).toBe('John');
      expect(result.email).toBe('[REDACTED]');
      // Check that the circular reference is preserved
      expect(result.self).toBeDefined();
      expect(result.self.name).toBe('John');
      // The circular reference preserves the original object structure to prevent infinite loops
      expect(result.self.email).toBe('john@example.com'); // Not redacted in circular ref
    });

    it('should handle complex nested structures with arrays', () => {
      const input = {
        users: [
          {
            profile: {
              email: 'user1@example.com',
              contacts: [
                { type: 'work', phone: '555-0001' },
                { type: 'home', mobile: '555-0002' },
              ],
            },
          },
        ],
      };

      const result = redactIt(input, { deepScan: true });

      expect(result).toEqual({
        users: [
          {
            profile: {
              email: '[REDACTED]',
              contacts: [
                { type: 'work', phone: '[REDACTED]' },
                { type: 'home', mobile: '[REDACTED]' },
              ],
            },
          },
        ],
      });
    });

    it('should preserve object types', () => {
      class User {
        constructor(
          public name: string,
          public email: string
        ) {}
      }

      const input = new User('John', 'john@example.com');
      const result = redactIt(input);

      expect(result.name).toBe('John');
      expect(result.email).toBe('[REDACTED]');
    });

    it('should handle RegExp filters with different flags', () => {
      const input = {
        EMAIL: 'user@example.com',
        email: 'user2@example.com',
      };

      // Case-sensitive regex
      const options: RedactOptions = {
        filters: [{ search: /^email$/, replace: '[REDACTED]' }],
        caseSensitive: true,
      };

      const result = redactIt(input, options);

      expect(result).toEqual({
        EMAIL: 'user@example.com', // Should not match
        email: '[REDACTED]', // Should match
      });
    });

    it('should handle empty filter arrays', () => {
      const input = {
        email: 'user@example.com',
        phone: '555-0123',
      };

      const result = redactIt(input, { filters: [] });

      expect(result).toEqual({
        email: 'user@example.com',
        phone: '555-0123',
      });
    });
  });
});
