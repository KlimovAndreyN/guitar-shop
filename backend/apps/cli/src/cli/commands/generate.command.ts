import { Command } from './command.interface';
import { generateAccount } from './generate-account';
import { generateCatalog } from './generate-catalog';
import { CommandType } from './const';

export class GenerateCommand implements Command {
  public getName(): string {
    return CommandType.Generate;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, mongoDbUrl, postgresUrl] = parameters;
    const productCount = Number.parseInt(count, 10);

    console.info('mongoDbUrl:', mongoDbUrl);
    console.info('postgresUrl:', postgresUrl);
    console.info('count:', count);

    await generateAccount(mongoDbUrl);
    await generateCatalog(postgresUrl, productCount);
  }
}
