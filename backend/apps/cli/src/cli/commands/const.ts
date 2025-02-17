export const COMMAND_PREFIX = '--';

export enum CommandType {
  Version = '--version',
  Help = '--help',
  Generate = '--generate'
}

export const CommandTypeParams = {
  [CommandType.Version]: '',
  [CommandType.Help]: '',
  [CommandType.Generate]: '<n> <path> <url>',
} as const;

export const CommandTypeInfo = {
  [CommandType.Version]: 'выводит номер версии',
  [CommandType.Help]: 'печатает этот текст',
  [CommandType.Generate]: 'генерирует произвольное количество тестовых данных',
} as const;

export const HelpText = {
  INFO: 'Программа для подготовки данных для REST API сервера.',
  EXAMPLE: 'Пример',
  COMMANDS: 'Команды'
} as const;

export const RUN_EXAMPLE = 'main.js --<command> [--arguments]';

export const MAX_SPACE_COUNT = 30;
