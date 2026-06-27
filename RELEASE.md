# Release Process

## Versioning

Sentinel follows [Semantic Versioning](https://semver.org/):
- **Major**: Breaking changes to public API or CLI
- **Minor**: New features, no breaking changes
- **Patch**: Bug fixes and small improvements

## Release Steps

1. **Create a changeset**
   ```bash
   pnpm changeset
   ```
   Describe the changes and select which packages to version.

2. **Version packages**
   ```bash
   pnpm version-packages
   ```
   This will bump versions and update changelogs.

3. **Build and test**
   ```bash
   pnpm build
   pnpm test
   ```

4. **Publish**
   ```bash
   pnpm release
   ```
   This publishes all packages to npm and creates a GitHub release.

5. **Tag the release**
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

## Automated Releases

Releases are automated via the [Release workflow](.github/workflows/release.yml). When changes are merged to `main`, the workflow will:
1. Build all packages
2. Run all tests
3. Create a release PR via Changesets
4. Publish to npm when the release PR is merged
