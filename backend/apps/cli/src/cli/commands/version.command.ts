import chalk from 'chalk';

import { getErrorMessage, getPackageVersion } from '@backend/shared/helpers';

import { Command } from './command.interface';
import { CommandType } from './const';

export class VersionCommand implements Command {

  public getName(): string {
    return CommandType.Version;
  }

  //!
  public async execute(): Promise<void> {
    try {
      const version = getPackageVersion();

      console.info(chalk.green(version));
    } catch (error: unknown) {
      console.error('Can\'t read version!');
      console.error(getErrorMessage(error));
    }
  }
}
