# Contributing to Sentinel

We love your input! We want to make contributing to Sentinel as easy and transparent as possible.

## Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`pnpm install`)
4. Make your changes
5. Build (`pnpm build`)
6. Test (`pnpm test`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/sentinel-ai/sentinel.git
cd sentinel

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Code Style

- We use TypeScript with strict mode enabled
- Follow the existing code patterns in the codebase
- Write tests for all new functionality
- Keep functions focused and single-responsibility
- Use descriptive variable and function names

## Pull Request Process

1. Ensure all tests pass and the build is clean
2. Update documentation if needed
3. Add a changeset with `pnpm changeset`
4. The PR will be merged once approved

## Reporting Issues

Report bugs and suggest features using the issue templates provided.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
