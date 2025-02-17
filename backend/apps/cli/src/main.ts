#!/usr/bin/env node

import 'reflect-metadata';

//!import { CLIApplication, GenerateCommand, HelpCommand, VersionCommand } from './cli/index';
import { CLIApplication, HelpCommand, VersionCommand } from './cli/index';

function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    //!new GenerateCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
