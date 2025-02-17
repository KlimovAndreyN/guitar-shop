import { PrismaClient } from '@prisma/client';

import { ConfigAlias, GuitarType } from '@backend/shared/core';
import { getRandomDate, getRandomItem, getRandomStringEnumValue } from '@backend/shared/helpers';
import { StringsCountByGuitarType } from '@backend/catalog/product';

import { MOCK_PRODUCT_TEMPLATE, MOCK_START_DATE } from './mocks';

export async function generateCatalog(postgresUrl: string, productCount: number) {
  process.env[ConfigAlias.PostgresDatabaseUrlEnv] = postgresUrl;

  const prismaClient = new PrismaClient({});
  const { article, description, price, title } = MOCK_PRODUCT_TEMPLATE;
  const now = new Date().toISOString();

  try {
    const data = Array.from(
      { length: productCount },
      (_, index) => {
        const digit = index + 1;
        const guitarType = getRandomStringEnumValue(GuitarType);
        const imagePath = guitarType + '.png';
        const stringsCount = getRandomItem<number>(StringsCountByGuitarType[guitarType]);
        const addedDate = getRandomDate(MOCK_START_DATE, now);

        return {
          title: title + digit,
          description: description + digit,
          article: article + digit,
          price: price * digit,
          imagePath,
          guitarType,
          stringsCount,
          addedDate
        }
      }
    );

    console.table(data);

    await prismaClient.product.createMany({ data });

    console.info('🤘️ Database postgres was filled!');
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}
