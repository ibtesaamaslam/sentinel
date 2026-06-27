# CLI Commands

## sentinel scan
Scan a repository for issues.

```
sentinel scan [target] [options]
```

Options:
- `-f, --format` - Report formats: html, json, sarif, terminal
- `-o, --output` - Output directory
- `-e, --exclude` - Exclude patterns
- `--no-parallel` - Disable parallel scanning
- `-w, --workers` - Worker threads
- `--open` - Open HTML report in browser

## sentinel monitor
Watch a repository for changes.

```
sentinel monitor [target] [options]
```

Options:
- `-d, --debounce` - Debounce interval in ms
- `-e, --exclude` - Exclude patterns

## sentinel init
Initialize Sentinel configuration.

```
sentinel init [target] [options]
```

Options:
- `-f, --force` - Overwrite existing configuration
