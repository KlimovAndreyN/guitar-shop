import chalk from 'chalk';

import { Command } from './command.interface';
import { CommandType, CommandTypeInfo, CommandTypeParams, RUN_EXAMPLE, HelpText, MAX_SPACE_COUNT } from './const';

export class HelpCommand implements Command {
  public getName(): string {
    return CommandType.Help;
  }

  public async execute(): Promise<void> {
    const exampleText = `${HelpText.EXAMPLE}:\n  ${chalk.green(RUN_EXAMPLE)}`;

    const commandsText = Object.values(CommandType).map(
      (commandType) => {
        const command = chalk.blue(commandType);
        const commandTypeParams = CommandTypeParams[commandType];
        const commandParams = chalk.gray(commandTypeParams);
        const commandInfo = chalk.yellow(`- ${CommandTypeInfo[commandType]}`);
        const space = Array.from({ length: MAX_SPACE_COUNT - commandType.length - commandTypeParams.length }).join(' ');
        const line = `  ${command} ${commandParams} ${space}${commandInfo} \n`;

        return line;
      }
    ).join('');

    console.info(`${chalk.bgGreen(HelpText.INFO)} \n${exampleText} \n${HelpText.COMMANDS}: \n${commandsText}`);
  }
}
