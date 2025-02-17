import { ConfigAlias, GuitarType, STRINGS_COUNT_VALUES } from '@backend/shared/core';
import { PrismaClient } from '@prisma/client';

import { MOCK_PRODUCT_TEMPLATE } from './mocks';

export async function generateCatalog(postgresUrl: string, productCount: number) {
  process.env[ConfigAlias.PostgresDatabaseUrlEnv] = postgresUrl;

  const prismaClient = new PrismaClient({});
  const { article, description, price, title } = MOCK_PRODUCT_TEMPLATE;

  try {
    const mockProducts = Array.from(
      { length: productCount },
      (_, index) => {
        const digit = index + 1;
        const guitarType = GuitarType.Acoustic as string; //!
        const imagePath = '/static/' + guitarType + '.png'; //!
        const stringsCount = STRINGS_COUNT_VALUES[0]; //! StringsCountByGuitarType

        return {
          title: title + digit,
          description: description + digit,
          article: article + digit,
          price: price * digit,
          imagePath,
          guitarType,
          stringsCount
        }
      }
    );

    console.table(mockProducts);

    for (const data of mockProducts) {
      await prismaClient.product.create({ data });
    }

    console.info('🤘️ Database postgres was filled!');
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}
