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
      expect(filters).toHaveLength(16);

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

    it('should return creditCard filter configuration', () => {
      const creditCardFilter = getDefaultFilter('creditCard');
      expect(creditCardFilter.search).toBeInstanceOf(RegExp);
      expect(creditCardFilter.replace).toBe('[REDACTED]');
    });

    it('should return driverLicense filter configuration', () => {
      const driverLicenseFilter = getDefaultFilter('driverLicense');
      expect(driverLicenseFilter.search).toBeInstanceOf(RegExp);
      expect(driverLicenseFilter.replace).toBe('[REDACTED]');
    });

    it('should return passport filter configuration', () => {
      const passportFilter = getDefaultFilter('passport');
      expect(passportFilter.search).toBeInstanceOf(RegExp);
      expect(passportFilter.replace).toBe('[REDACTED]');
    });

    it('should return ipAddress filter configuration', () => {
      const ipAddressFilter = getDefaultFilter('ipAddress');
      expect(ipAddressFilter.search).toBeInstanceOf(RegExp);
      expect(ipAddressFilter.replace).toBe('[REDACTED]');
    });

    it('should return password filter configuration', () => {
      const passwordFilter = getDefaultFilter('password');
      expect(passwordFilter.search).toBeInstanceOf(RegExp);
      expect(passwordFilter.replace).toBe('[REDACTED]');
    });

    it('should return bankAccount filter configuration', () => {
      const bankAccountFilter = getDefaultFilter('bankAccount');
      expect(bankAccountFilter.search).toBeInstanceOf(RegExp);
      expect(bankAccountFilter.replace).toBe('[REDACTED]');
    });

    it('should return dateOfBirth filter configuration', () => {
      const dateOfBirthFilter = getDefaultFilter('dateOfBirth');
      expect(dateOfBirthFilter.search).toBeInstanceOf(RegExp);
      expect(dateOfBirthFilter.replace).toBe('[REDACTED]');
    });

    it('should return taxId filter configuration', () => {
      const taxIdFilter = getDefaultFilter('taxId');
      expect(taxIdFilter.search).toBeInstanceOf(RegExp);
      expect(taxIdFilter.replace).toBe('[REDACTED]');
    });

    it('should return medicalRecord filter configuration', () => {
      const medicalRecordFilter = getDefaultFilter('medicalRecord');
      expect(medicalRecordFilter.search).toBeInstanceOf(RegExp);
      expect(medicalRecordFilter.replace).toBe('[REDACTED]');
    });

    it('should return nationalId filter configuration', () => {
      const nationalIdFilter = getDefaultFilter('nationalId');
      expect(nationalIdFilter.search).toBeInstanceOf(RegExp);
      expect(nationalIdFilter.replace).toBe('[REDACTED]');
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
      expect(isDefaultFilterName('creditCard')).toBe(true);
      expect(isDefaultFilterName('driverLicense')).toBe(true);
      expect(isDefaultFilterName('passport')).toBe(true);
      expect(isDefaultFilterName('ipAddress')).toBe(true);
      expect(isDefaultFilterName('password')).toBe(true);
      expect(isDefaultFilterName('bankAccount')).toBe(true);
      expect(isDefaultFilterName('dateOfBirth')).toBe(true);
      expect(isDefaultFilterName('taxId')).toBe(true);
      expect(isDefaultFilterName('medicalRecord')).toBe(true);
      expect(isDefaultFilterName('nationalId')).toBe(true);
      expect(isDefaultFilterName('address')).toBe(true);
      expect(isDefaultFilterName('postalCode')).toBe(true);
      expect(isDefaultFilterName('securityAnswer')).toBe(true);
    });

    it('should return false for invalid filter names', () => {
      expect(isDefaultFilterName('unknown')).toBe(false);
      expect(isDefaultFilterName('invalidFilter')).toBe(false);
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

    describe('creditCard filter', () => {
      const creditCardPattern = DEFAULT_FILTERS.creditCard.search as RegExp;

      it('should match various credit card property names', () => {
        expect(creditCardPattern.test('creditCard')).toBe(true);
        expect(creditCardPattern.test('creditCardNumber')).toBe(true);
        expect(creditCardPattern.test('cardNumber')).toBe(true);
        expect(creditCardPattern.test('ccNumber')).toBe(true);
        expect(creditCardPattern.test('paymentCard')).toBe(true);
        expect(creditCardPattern.test('cardInfo')).toBe(true);
        expect(creditCardPattern.test('userCreditCard')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(creditCardPattern.test('CREDITCARD')).toBe(true);
        expect(creditCardPattern.test('CreditCard')).toBe(true);
        expect(creditCardPattern.test('CARDNUMBER')).toBe(true);
      });

      it('should not match non-credit card properties', () => {
        expect(creditCardPattern.test('email')).toBe(false);
        expect(creditCardPattern.test('name')).toBe(false);
        expect(creditCardPattern.test('address')).toBe(false);
      });
    });

    describe('driverLicense filter', () => {
      const driverLicensePattern = DEFAULT_FILTERS.driverLicense.search as RegExp;

      it('should match various driver license property names', () => {
        expect(driverLicensePattern.test('driverLicense')).toBe(true);
        expect(driverLicensePattern.test('driversLicense')).toBe(true);
        expect(driverLicensePattern.test('licenseNumber')).toBe(true);
        expect(driverLicensePattern.test('dlNumber')).toBe(true);
        expect(driverLicensePattern.test('drivingLicense')).toBe(true);
        expect(driverLicensePattern.test('userDriverLicense')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(driverLicensePattern.test('DRIVERLICENSE')).toBe(true);
        expect(driverLicensePattern.test('DriverLicense')).toBe(true);
        expect(driverLicensePattern.test('LICENSENUMBER')).toBe(true);
      });

      it('should not match non-license properties', () => {
        expect(driverLicensePattern.test('email')).toBe(false);
        expect(driverLicensePattern.test('name')).toBe(false);
        expect(driverLicensePattern.test('address')).toBe(false);
      });
    });

    describe('passport filter', () => {
      const passportPattern = DEFAULT_FILTERS.passport.search as RegExp;

      it('should match various passport property names', () => {
        expect(passportPattern.test('passport')).toBe(true);
        expect(passportPattern.test('passportNumber')).toBe(true);
        expect(passportPattern.test('passportId')).toBe(true);
        expect(passportPattern.test('userPassport')).toBe(true);
        expect(passportPattern.test('passportInfo')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(passportPattern.test('PASSPORT')).toBe(true);
        expect(passportPattern.test('Passport')).toBe(true);
        expect(passportPattern.test('PASSPORTNUMBER')).toBe(true);
      });

      it('should not match non-passport properties', () => {
        expect(passportPattern.test('email')).toBe(false);
        expect(passportPattern.test('name')).toBe(false);
        expect(passportPattern.test('address')).toBe(false);
      });
    });

    describe('ipAddress filter', () => {
      const ipAddressPattern = DEFAULT_FILTERS.ipAddress.search as RegExp;

      it('should match various IP address property names', () => {
        expect(ipAddressPattern.test('ipAddress')).toBe(true);
        expect(ipAddressPattern.test('clientIp')).toBe(true);
        expect(ipAddressPattern.test('remoteIp')).toBe(true);
        expect(ipAddressPattern.test('userIp')).toBe(true);
        expect(ipAddressPattern.test('ip')).toBe(true);
        expect(ipAddressPattern.test('sourceIp')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(ipAddressPattern.test('IPADDRESS')).toBe(true);
        expect(ipAddressPattern.test('IpAddress')).toBe(true);
        expect(ipAddressPattern.test('CLIENTIP')).toBe(true);
      });

      it('should not match non-IP properties', () => {
        expect(ipAddressPattern.test('email')).toBe(false);
        expect(ipAddressPattern.test('name')).toBe(false);
        expect(ipAddressPattern.test('address')).toBe(false);
      });
    });

    describe('password filter', () => {
      const passwordPattern = DEFAULT_FILTERS.password.search as RegExp;

      it('should match various password/secret property names', () => {
        expect(passwordPattern.test('password')).toBe(true);
        expect(passwordPattern.test('passwd')).toBe(true);
        expect(passwordPattern.test('pwd')).toBe(true);
        expect(passwordPattern.test('token')).toBe(true);
        expect(passwordPattern.test('apiKey')).toBe(true);
        expect(passwordPattern.test('secret')).toBe(true);
        expect(passwordPattern.test('authToken')).toBe(true);
        expect(passwordPattern.test('accessToken')).toBe(true);
        expect(passwordPattern.test('bearerToken')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(passwordPattern.test('PASSWORD')).toBe(true);
        expect(passwordPattern.test('Password')).toBe(true);
        expect(passwordPattern.test('APIKEY')).toBe(true);
      });

      it('should not match non-password properties', () => {
        expect(passwordPattern.test('email')).toBe(false);
        expect(passwordPattern.test('name')).toBe(false);
        expect(passwordPattern.test('address')).toBe(false);
      });
    });

    describe('bankAccount filter', () => {
      const bankAccountPattern = DEFAULT_FILTERS.bankAccount.search as RegExp;

      it('should match various bank account property names', () => {
        expect(bankAccountPattern.test('accountNumber')).toBe(true);
        expect(bankAccountPattern.test('bankAccount')).toBe(true);
        expect(bankAccountPattern.test('routingNumber')).toBe(true);
        expect(bankAccountPattern.test('iban')).toBe(true);
        expect(bankAccountPattern.test('bankNumber')).toBe(true);
        expect(bankAccountPattern.test('accountInfo')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(bankAccountPattern.test('ACCOUNTNUMBER')).toBe(true);
        expect(bankAccountPattern.test('AccountNumber')).toBe(true);
        expect(bankAccountPattern.test('BANKACCOUNT')).toBe(true);
      });

      it('should not match non-bank properties', () => {
        expect(bankAccountPattern.test('email')).toBe(false);
        expect(bankAccountPattern.test('name')).toBe(false);
        expect(bankAccountPattern.test('address')).toBe(false);
      });
    });

    describe('dateOfBirth filter', () => {
      const dateOfBirthPattern = DEFAULT_FILTERS.dateOfBirth.search as RegExp;

      it('should match various date of birth property names', () => {
        expect(dateOfBirthPattern.test('dateOfBirth')).toBe(true);
        expect(dateOfBirthPattern.test('birthDate')).toBe(true);
        expect(dateOfBirthPattern.test('dob')).toBe(true);
        expect(dateOfBirthPattern.test('birthday')).toBe(true);
        expect(dateOfBirthPattern.test('birthDay')).toBe(true);
        expect(dateOfBirthPattern.test('userDateOfBirth')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(dateOfBirthPattern.test('DATEOFBIRTH')).toBe(true);
        expect(dateOfBirthPattern.test('DateOfBirth')).toBe(true);
        expect(dateOfBirthPattern.test('BIRTHDAY')).toBe(true);
      });

      it('should not match non-birth properties', () => {
        expect(dateOfBirthPattern.test('email')).toBe(false);
        expect(dateOfBirthPattern.test('name')).toBe(false);
        expect(dateOfBirthPattern.test('address')).toBe(false);
      });
    });

    describe('taxId filter', () => {
      const taxIdPattern = DEFAULT_FILTERS.taxId.search as RegExp;

      it('should match various tax ID property names', () => {
        expect(taxIdPattern.test('taxId')).toBe(true);
        expect(taxIdPattern.test('ein')).toBe(true);
        expect(taxIdPattern.test('taxpayerId')).toBe(true);
        expect(taxIdPattern.test('federalId')).toBe(true);
        expect(taxIdPattern.test('taxNumber')).toBe(true);
        expect(taxIdPattern.test('companyTaxId')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(taxIdPattern.test('TAXID')).toBe(true);
        expect(taxIdPattern.test('TaxId')).toBe(true);
        expect(taxIdPattern.test('EIN')).toBe(true);
      });

      it('should not match non-tax properties', () => {
        expect(taxIdPattern.test('email')).toBe(false);
        expect(taxIdPattern.test('name')).toBe(false);
        expect(taxIdPattern.test('address')).toBe(false);
      });
    });

    describe('medicalRecord filter', () => {
      const medicalRecordPattern = DEFAULT_FILTERS.medicalRecord.search as RegExp;

      it('should match various medical record property names', () => {
        expect(medicalRecordPattern.test('medicalRecord')).toBe(true);
        expect(medicalRecordPattern.test('mrn')).toBe(true);
        expect(medicalRecordPattern.test('patientId')).toBe(true);
        expect(medicalRecordPattern.test('healthId')).toBe(true);
        expect(medicalRecordPattern.test('medicalNumber')).toBe(true);
        expect(medicalRecordPattern.test('medicalRecordNumber')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(medicalRecordPattern.test('MEDICALRECORD')).toBe(true);
        expect(medicalRecordPattern.test('MedicalRecord')).toBe(true);
        expect(medicalRecordPattern.test('MRN')).toBe(true);
      });

      it('should not match non-medical properties', () => {
        expect(medicalRecordPattern.test('email')).toBe(false);
        expect(medicalRecordPattern.test('name')).toBe(false);
        expect(medicalRecordPattern.test('address')).toBe(false);
      });
    });

    describe('nationalId filter', () => {
      const nationalIdPattern = DEFAULT_FILTERS.nationalId.search as RegExp;

      it('should match various national ID property names', () => {
        expect(nationalIdPattern.test('nationalId')).toBe(true);
        expect(nationalIdPattern.test('citizenId')).toBe(true);
        expect(nationalIdPattern.test('personalId')).toBe(true);
        expect(nationalIdPattern.test('governmentId')).toBe(true);
        expect(nationalIdPattern.test('identityNumber')).toBe(true);
        expect(nationalIdPattern.test('nationalIdentity')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(nationalIdPattern.test('NATIONALID')).toBe(true);
        expect(nationalIdPattern.test('NationalId')).toBe(true);
        expect(nationalIdPattern.test('CITIZENID')).toBe(true);
      });

      it('should not match non-national ID properties', () => {
        expect(nationalIdPattern.test('email')).toBe(false);
        expect(nationalIdPattern.test('name')).toBe(false);
        expect(nationalIdPattern.test('address')).toBe(false);
      });
    });

    describe('address filter', () => {
      const addressPattern = DEFAULT_FILTERS.address.search as RegExp;

      it('should match various address property names', () => {
        expect(addressPattern.test('address')).toBe(true);
        expect(addressPattern.test('billingAddress')).toBe(true);
        expect(addressPattern.test('shippingAddress')).toBe(true);
        expect(addressPattern.test('addressLine1')).toBe(true);
        expect(addressPattern.test('streetAddress')).toBe(true);
        expect(addressPattern.test('aptNumber')).toBe(true);
        expect(addressPattern.test('poBox')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(addressPattern.test('ADDRESS')).toBe(true);
        expect(addressPattern.test('AddressLine2')).toBe(true);
        expect(addressPattern.test('BILLINGADDRESS')).toBe(true);
      });

      it('should not match non-address properties', () => {
        expect(addressPattern.test('email')).toBe(false);
        expect(addressPattern.test('phone')).toBe(false);
        expect(addressPattern.test('username')).toBe(false);
      });
    });

    describe('postalCode filter', () => {
      const postalCodePattern = DEFAULT_FILTERS.postalCode.search as RegExp;

      it('should match various postal code property names', () => {
        expect(postalCodePattern.test('zip')).toBe(true);
        expect(postalCodePattern.test('zipCode')).toBe(true);
        expect(postalCodePattern.test('zipcode')).toBe(true);
        expect(postalCodePattern.test('postalCode')).toBe(true);
        expect(postalCodePattern.test('postCode')).toBe(true);
        expect(postalCodePattern.test('zip_plus4')).toBe(true);
        expect(postalCodePattern.test('zipPostal')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(postalCodePattern.test('ZIP')).toBe(true);
        expect(postalCodePattern.test('ZipCode')).toBe(true);
        expect(postalCodePattern.test('POSTALCODE')).toBe(true);
      });

      it('should not match non-postal properties', () => {
        expect(postalCodePattern.test('zipper')).toBe(false);
        expect(postalCodePattern.test('zipFile')).toBe(false);
        expect(postalCodePattern.test('email')).toBe(false);
      });
    });

    describe('securityAnswer filter', () => {
      const securityAnswerPattern = DEFAULT_FILTERS.securityAnswer.search as RegExp;

      it('should match various security question property names', () => {
        expect(securityAnswerPattern.test('securityQuestion')).toBe(true);
        expect(securityAnswerPattern.test('securityAnswer')).toBe(true);
        expect(securityAnswerPattern.test('secretQuestion')).toBe(true);
        expect(securityAnswerPattern.test('secretAnswer')).toBe(true);
        expect(securityAnswerPattern.test('motherMaidenName')).toBe(true);
      });

      it('should be case insensitive', () => {
        expect(securityAnswerPattern.test('SECURITYQUESTION')).toBe(true);
        expect(securityAnswerPattern.test('SecurityAnswer')).toBe(true);
        expect(securityAnswerPattern.test('SECRETQUESTION')).toBe(true);
      });

      it('should not match non-security properties', () => {
        expect(securityAnswerPattern.test('email')).toBe(false);
        expect(securityAnswerPattern.test('password')).toBe(false);
        expect(securityAnswerPattern.test('address')).toBe(false);
      });
    });
  });
});
