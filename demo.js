#!/usr/bin/env node

// Demo script to showcase the redact-it library functionality
const { redactIt } = require('./dist');

console.log('🔒 @nurv-llc/redact-it Demo\n');

// Basic example
console.log('📋 Basic Usage:');
const basicData = {
  name: 'John Doe',
  email: 'john@example.com',
  phoneNumber: '555-123-4567',
  ssn: '123-45-6789',
  address: '123 Main St',
};

console.log('Input:', JSON.stringify(basicData, null, 2));
console.log('Output:', JSON.stringify(redactIt(basicData), null, 2));
console.log();

// Array example
console.log('📋 Array Processing:');
const arrayData = [
  { name: 'John', email: 'john@test.com', role: 'admin' },
  { name: 'Jane', mobile: '555-0123', role: 'user' },
];

console.log('Input:', JSON.stringify(arrayData, null, 2));
console.log('Output:', JSON.stringify(redactIt(arrayData), null, 2));
console.log();

// Deep scan example
console.log('📋 Deep Scan Feature:');
const nestedData = {
  company: 'ACME Corp',
  employee: {
    profile: {
      name: 'John Doe',
      contactInfo: {
        email: 'john@acme.com',
        phone: '555-0001',
      },
    },
  },
};

console.log('Input:', JSON.stringify(nestedData, null, 2));
console.log('Without deepScan:', JSON.stringify(redactIt(nestedData), null, 2));
console.log('With deepScan:', JSON.stringify(redactIt(nestedData, { deepScan: true }), null, 2));
console.log();

// Custom filters example
console.log('📋 Custom Filters:');
const customData = {
  email: 'user@example.com',
  password: 'secret123',
  apiKey: 'abc-def-123',
  username: 'john_doe',
};

const customOptions = {
  additionalFilters: [
    { search: 'password', replace: '[HIDDEN]' },
    { search: /.*key.*$/i, replace: '[SECRET]' },
  ],
};

console.log('Input:', JSON.stringify(customData, null, 2));
console.log('With custom filters:', JSON.stringify(redactIt(customData, customOptions), null, 2));
console.log();

// Case sensitivity example
console.log('📋 Case Sensitivity:');
const caseData = {
  EMAIL: 'user@example.com',
  email: 'user2@example.com',
  Phone: '555-0123',
  phone: '555-0124',
};

console.log('Input:', JSON.stringify(caseData, null, 2));
console.log('Case insensitive (default):', JSON.stringify(redactIt(caseData), null, 2));
console.log(
  'Case sensitive:',
  JSON.stringify(redactIt(caseData, { caseSensitive: true }), null, 2)
);

console.log('\n✅ Demo completed! Check out the README.md for full documentation.');
