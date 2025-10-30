# Contributing to @nurv-llc/redact-it

Thank you for considering contributing to redact-it! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct. Please treat all community members with respect and kindness.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/redact-it.git
   cd redact-it
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Tests

```bash
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

### Code Formatting

We use Prettier for code formatting:

```bash
npm run format          # Format all files
npm run format:check    # Check if files are formatted
```

### Type Checking

```bash
npm run type-check      # Run TypeScript compiler check
```

### Building

```bash
npm run build           # Build the project
npm run build:watch     # Build in watch mode
```

## Commit Guidelines

### Version Control via Commit Messages

The CI system automatically handles version bumping and publishing:

- **Auto-patch**: Default behavior when the current version already exists on npm
- **Manual control**: Use `[major]` or `[minor]` in your commit message for specific version bumps
- **Skip publishing**: Use `[skip-publish]` in your commit message to skip npm publishing

### Commit Message Examples

```bash
# Auto-patch version (default)
fix: handle undefined values in nested objects correctly

# Minor version bump
feat: add support for custom replacement text in filters [minor]

# Major version bump  
feat: change default filter behavior to be case-sensitive [major]

# Skip publishing to npm
docs: update README with new examples [skip-publish]

# Regular commits (will auto-patch if version exists)
test: add tests for circular reference handling
chore: update dependencies
```

### Conventional Commits (Optional)

While not required for the CI system, you can still follow [Conventional Commits](https://conventionalcommits.org/) for consistency:

- `feat`: A new feature
- `fix`: A bug fix  
- `docs`: Documentation only changes
- `style`: Formatting changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

## Pull Request Process

1. **Update tests**: Add or update tests for any new functionality
2. **Update documentation**: Update README.md and JSDoc comments as needed
3. **Format code**: Run `npm run format` before committing
4. **Ensure CI passes**: All tests and checks must pass
5. **Write clear PR description**: Explain what changes were made and why

### PR Checklist

- [ ] Tests added/updated for new functionality
- [ ] All tests pass (`npm test`)
- [ ] Code is formatted (`npm run format`)
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Documentation updated (if applicable)
- [ ] Commit messages follow conventional commit format

## Testing Guidelines

### Writing Tests

- Place test files next to source files with `.spec.ts` extension
- Write descriptive test names that explain the expected behavior
- Group related tests using `describe` blocks
- Test both happy paths and edge cases

### Test Structure

```typescript
describe('FeatureName', () => {
  describe('method name', () => {
    it('should do something when condition is met', () => {
      // Arrange
      const input = {
        /* test data */
      };

      // Act
      const result = methodUnderTest(input);

      // Assert
      expect(result).toEqual(expectedOutput);
    });
  });
});
```

### Coverage Requirements

- Maintain high test coverage (>90%)
- Cover edge cases and error conditions
- Test TypeScript types where applicable

## Release Process

Releases are automated via GitHub Actions:

1. Merge PR to `master` branch
2. CI automatically runs tests and builds
3. System checks if current version exists on npm
4. If version exists, auto-bumps based on commit message tags (`[major]`, `[minor]`, or patch)
5. Creates git tag and pushes to repository
6. Publishes to npm automatically

### Manual Version Control

- Use `[major]` in commit message for breaking changes
- Use `[minor]` in commit message for new features  
- Default behavior is patch version bump
- Use `[skip-publish]` to skip npm publishing

## Project Structure

```
src/
├── types/              # TypeScript type definitions
├── filters/            # Filter implementations and tests
├── redactor.ts         # Core redaction logic
├── redactor.spec.ts    # Core logic tests
└── index.ts            # Main exports

.github/
├── workflows/          # CI/CD workflows
├── ISSUE_TEMPLATE/     # Issue templates
└── pull_request_template.md

dist/                   # Compiled output (generated)
coverage/               # Test coverage reports (generated)
```

## Questions or Need Help?

- Open an issue for bug reports or feature requests
- Start a discussion for questions about usage or design
- Check existing issues before creating new ones

Thank you for contributing to redact-it! 🚀
