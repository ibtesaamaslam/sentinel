import { Command } from 'commander';
import { ConfigLoader } from '@sentinel/config';
import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pico from 'picocolors';

export function createInitCommand(): Command {
  const cmd = new Command('init')
    .description('Initialize a Sentinel configuration file in the current directory')
    .argument('[target]', 'Target directory', '.')
    .option('-f, --force', 'Overwrite existing configuration', false)
    .action((target: string, options: { force: boolean; yaml: boolean }) => {
      const targetDir = resolve(target);

      if (!existsSync(targetDir)) {
        console.error(pico.red(`Error: Directory not found: ${targetDir}`));
        process.exit(1);
      }

      const configFile = options.yaml ? 'sentinel.config.yaml' : 'sentinel.config.json';
      const configPath = resolve(targetDir, configFile);

      if (existsSync(configPath) && !options.force) {
        console.error(pico.yellow(`Configuration file already exists: ${configPath}`));
        console.error(pico.yellow('Use --force to overwrite'));
        process.exit(1);
      }

      const loader = new ConfigLoader();
      const defaultConfig = loader.generateDefaultConfig(targetDir);

      writeFileSync(configPath, defaultConfig, 'utf-8');

      console.log(pico.green('✓') + ` Sentinel configuration created: ${pico.cyan(configPath)}`);
      console.log('');
      console.log(pico.dim('Next steps:'));
      console.log(`  ${pico.cyan('sentinel scan')}     - Scan the repository`);
      console.log(`  ${pico.cyan('sentinel monitor')}  - Watch for changes`);
      console.log(`  ${pico.cyan('sentinel --help')}   - View all commands`);

      process.exit(0);
    });

  return cmd;
}
