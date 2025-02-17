import { MockUser } from './type';

export const MOCK_USER_ADMIN: MockUser = {
  id: '658170cbb954e9f5b905ccf4',
  email: 'admin',
  name: 'admin',
  password: 'admin'
} as const;

export const MOCK_PRODUCT_TEMPLATE =
  {
    title: 'title title #',
    description: 'description description #',
    article: 'art#',
    price: 5000
  } as const;
