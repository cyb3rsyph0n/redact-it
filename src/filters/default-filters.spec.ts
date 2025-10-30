import {
  getDefaultFilters,
  getDefaultFilter,
  isDefaultFilterName,
  DEFAULT_FILTERS,
} from './default-filters';

describe('Default Filters', () => {
  describe('getDefaultFilters', () => {
    it('should return an array of default filter configurations', () => {
      const filters = getDefaultFilters();
      expect(Array.isArray(filters)).toBe(true);
      expect(filters).toHaveLength(3);

      // Check that all filters have the required properties
      filters.forEach(filter => {
        expect(filter).toHaveProperty('search');
        expect(filter).toHaveProperty('replace');
        expect(filter.replace).toBe('[REDACTED]');
      });
    });
  });

  describe('getDefaultFilter', () => {
    it('should return email filter configuration', () => {
      const emailFilter = getDefaultFilter('email');
      expect(emailFilter.search).toBeInstanceOf(RegExp);
      expect(emailFilter.replace).toBe('[REDACTED]');
    });

    it('should return phone filter configuration', () => {
      const phoneFilter = getDefaultFilter('phone');
      expect(phoneFilter.search).toBeInstanceOf(RegExp);
      expect(phoneFilter.replace).toBe('[REDACTED]');
    });

    it('should return ssn filter configuration', () => {
      const ssnFilter = getDefaultFilter('ssn');
      expect(ssnFilter.search).toBeInstanceOf(RegExp);
      expect(ssnFilter.replace).toBe('[REDACTED]');
    });

    it('should throw error for unknown filter name', () => {
      expect(() => {
        // @ts-expect-error - testing invalid input
        getDefaultFilter('unknown');
      }).toThrow('Unknown default filter: unknown');
    });
  });

  describe('isDefaultFilterName', () => {
    it('should return true for valid default filter names', () => {
      expect(isDefaultFilterName('email')).toBe(true);
      expect(isDefaultFilterName('phone')).toBe(true);
      expect(isDefaultFilterName('ssn')).toBe(true);
    });

    it('should return false for invalid filter names', () => {
      expect(isDefaultFilterName('unknown')).toBe(false);
      expect(isDefaultFilterName('password')).toBe(false);
      expect(isDefaultFilterName('')).toBe(false);
    });
  });

  describe('DEFAULT_FILTERS patterns', () => {
    describe('email filter', () => {
      const emailPattern = DEFAULT_FILTERS.email.search as RegExp;

      it('should match various email property names', () => {
        expect(emailPattern.test('email')).toBe(true);
        expect(emailPattern.test('emailAddress')).toBe(true);
        expect(emailPattern.test('userEmail')).toBe(true);
        expect(emailPattern.test('contactEmail')).toBe(true);
        expect(emailPattern.test('workEmail')).toBe(true);
        expect(emailPattern.test('personalEmail')).toBe(true);
        expect(emailPattern.test('primaryEmail')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(emailPattern.test('EMAIL')).toBe(true);
        expect(emailPattern.test('Email')).toBe(true);
        expect(emailPattern.test('EMAILADDRESS')).toBe(true);
      });

      it('should not match non-email properties', () => {
        expect(emailPattern.test('name')).toBe(false);
        expect(emailPattern.test('address')).toBe(false);
        expect(emailPattern.test('phone')).toBe(false);
      });
    });

    describe('phone filter', () => {
      const phonePattern = DEFAULT_FILTERS.phone.search as RegExp;

      it('should match various phone property names', () => {
        expect(phonePattern.test('phone')).toBe(true);
        expect(phonePattern.test('phoneNumber')).toBe(true);
        expect(phonePattern.test('mobile')).toBe(true);
        expect(phonePattern.test('mobileNumber')).toBe(true);
        expect(phonePattern.test('cell')).toBe(true);
        expect(phonePattern.test('cellPhone')).toBe(true);
        expect(phonePattern.test('telephone')).toBe(true);
        expect(phonePattern.test('workPhone')).toBe(true);
        expect(phonePattern.test('homePhone')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(phonePattern.test('PHONE')).toBe(true);
        expect(phonePattern.test('Phone')).toBe(true);
        expect(phonePattern.test('MOBILE')).toBe(true);
        expect(phonePattern.test('CELLPHONE')).toBe(true);
      });

      it('should not match non-phone properties', () => {
        expect(phonePattern.test('email')).toBe(false);
        expect(phonePattern.test('name')).toBe(false);
        expect(phonePattern.test('address')).toBe(false);
      });
    });

    describe('ssn filter', () => {
      const ssnPattern = DEFAULT_FILTERS.ssn.search as RegExp;

      it('should match various SSN property names', () => {
        expect(ssnPattern.test('ssn')).toBe(true);
        expect(ssnPattern.test('socialSecurityNumber')).toBe(true);
        expect(ssnPattern.test('socialSecurity')).toBe(true);
        expect(ssnPattern.test('socialsecurity')).toBe(true);
        expect(ssnPattern.test('social_security_number')).toBe(true);
        expect(ssnPattern.test('social_security')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(ssnPattern.test('SSN')).toBe(true);
        expect(ssnPattern.test('Ssn')).toBe(true);
        expect(ssnPattern.test('SOCIALSECURITYNUMBER')).toBe(true);
        expect(ssnPattern.test('SocialSecurity')).toBe(true);
      });

      it('should not match non-SSN properties', () => {
        expect(ssnPattern.test('email')).toBe(false);
        expect(ssnPattern.test('phone')).toBe(false);
        expect(ssnPattern.test('name')).toBe(false);
      });
    });
  });
});
