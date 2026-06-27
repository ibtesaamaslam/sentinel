# Troubleshooting

## Common Issues

### "Command not found" after installation
Make sure the global installation is in your PATH:
```bash
# Verify installation
which sentinel
# Or on Windows
where sentinel
```

### "Target directory not found"
Ensure the path is correct and accessible:
```bash
sentinel scan ./my-project
# Use absolute paths if needed
sentinel scan /home/user/projects/my-project
```

### Build fails with TypeScript errors
Ensure you have the correct Node.js version:
```bash
node --version  # Should be >= 22
pnpm install    # Fresh install
pnpm build      # Rebuild
```

### Tests fail
```bash
# Run specific package tests
cd packages/core && pnpm test
# Check for environment issues
pnpm rebuild
```

## Known Limitations
- Windows: Clean scripts use Node.js fs.rmSync
- Binary files are skipped during scanning
- Very large files (>1MB) are skipped
- YAML config files require the `yaml` npm package

## Getting Help

If you encounter issues not listed here:
1. Check [GitHub Issues](https://github.com/sentinel-ai/sentinel/issues)
2. Search [GitHub Discussions](https://github.com/sentinel-ai/sentinel/discussions)
3. Open a new issue with reproduction steps
