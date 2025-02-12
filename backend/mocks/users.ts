import { User } from '../libs/shared/core/src/lib/types/user.interface';

type MockUser = User & { password: string };

export const MOCK_USERS: MockUser[] = [
  {
    id: '658170cbb954e9f5b905ccf4',
    email: 'admin',
    name: 'admin',
    password: 'admin'
  }
] as const;
