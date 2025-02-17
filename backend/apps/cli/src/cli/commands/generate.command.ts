import * as Mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';

import { SALT_ROUNDS } from '@backend/account/shop-user';

//!import got from 'got';
import { Command } from './command.interface';
//!import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index';
//!import { TSVFileWriter } from '../../shared/libs/file-writer/index';
import { CommandType } from './const';
import { MOCK_USER_ADMIN } from './mocks';
import { MockUserEntity } from './type';

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

    const mongoose = await Mongoose.connect(mongoDbUrl);
    const salt = await genSalt(SALT_ROUNDS);

    const { id, email, name, password } = MOCK_USER_ADMIN;
    const passwordHash = await hash(password, salt);
    await new MockUserEntity({ id, email, name, passwordHash }).save();

    await mongoose.disconnect?.();
    console.info('🤘️ Database mongoDb was filled!');
    /*
        try {
          await this.loadMockData(url);
    
          const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
          const tsvFileWriter = new TSVFileWriter(filepath);
    
          for (let i = 0; i < offerCount; i++) {
            await tsvFileWriter.write(tsvOfferGenerator.generate());
          }
    
          console.info(`File ${filepath} was created!`);
        } catch (error: unknown) {
          console.error('Can\'t generate data!');
          console.error(getErrorMessage(error));
        }
    */
  }
}
/*
import { Command } from './command.interface';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index';
import { TSVFileReader } from '../../shared/libs/file-reader/index';
import { getMongoURI } from '../../shared/helpers/index';
import { Offer } from '../../shared/types/index';
import { CommandType } from './const';

const DEFAULT_USER_PASSWORD = '123456';

export class ImportCommand implements Command {
  private logger: Logger;
  private salt: string;
  private databaseClient: DatabaseClient;
  private userService: UserService;
  private offerService: OfferService;

  private async saveOffer(offer: Offer) {
    const {
      title,
      description,
      publishDate,
      cityName,
      previewImage,
      images,
      isPremium,
      rating,
      type,
      rooms,
      maxAdults,
      price,
      goods,
      host,
      location
    } = offer;

    const hostEntity = await this.userService.findOrCreate({
      ...host,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);
    const { id: hostId } = hostEntity;
    const { avatarPath } = host;

    await this.userService.updateById(hostId, { avatarPath });
    await this.offerService.create({
      title,
      description,
      publishDate,
      city: cityName,
      previewImage,
      images,
      isPremium,
      type,
      rooms,
      maxAdults,
      price,
      goods,
      location
    }, hostId, rating);
  }

  private async onImportedOffer(offer: Offer, resolve: () => void): Promise<void> {
    await this.saveOffer(offer);

    resolve();
  }

  private async onCompleteImport(count: number) {
    this.logger.info(`${count} rows imported.`);

    await this.databaseClient.disconnect();
  }

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.databaseClient = new MongoDatabaseClient(this.logger);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
  }

  public getName(): string {
    return CommandType.Import;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename, databaseLogin, databasePassword, databaseHost, databasePort, databaseName, salt] = parameters;

    const uri = getMongoURI(databaseLogin, databasePassword, databaseHost, databasePort, databaseName);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error: unknown) {
      this.logger.error(`Can't import data from file: ${filename}!`, error);
    }
  }
}
*/
