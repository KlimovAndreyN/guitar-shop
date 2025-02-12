import { GuitarType } from '../types/guitar-type.enum';
import { STRINGS_COUNT_VALUES } from '../types/strings-count.type';

export const ApiPropertyOption = {
  User: {
    Id: {
      description: 'The unique user ID',
      example: '658170cbb954e9f5b905ccf4'
    },
    Email: {
      description: 'The unique user email',
      example: 'user@local.local'
    },
    Name: {
      description: 'The user name',
      example: 'Name'
    },
    Password: {
      description: 'The user password',
      example: 'password'
    },
    AccessToken: {
      description: 'The user access JWT token',
      example: 'asdasdsdfetyhetyhythgfnghnlkcsdkfajowfjlsdkmcv'
    },
    Login: {
      description: 'The login user (email)',
      example: 'admin'
    }
  },
  Product: {
    Id: {
      description: 'The unique product ID',
      example: '2f31b19b-97eb-4305-877a-0b9be7faca8f'
    },
    Title: {
      description: 'The product title',
      example: 'title title'
    },
    Description: {
      description: 'The product description',
      example: 'description description'
    },
    AddedDate: {
      description: 'The product added date',
      example: '12.02.2025' //! приметнить формат и проверить
    },
    ImagePath: {
      description: 'The product image path',
      example: '/img/12345.jpg'
    },
    ImageFile: {
      description: 'The product image file',
      type: 'string',
      format: 'binary'
    },
    GuitarType: {
      description: 'The guitar type',
      enum: GuitarType,
      example: GuitarType.Electro
    },
    Article: {
      description: 'The product article',
      example: 'article'
    },
    StringsCount: {
      description: 'The product strings count',
      //! сработает?
      enum: STRINGS_COUNT_VALUES,
      example: STRINGS_COUNT_VALUES[0]
    },
    //! сделать округление до копеек?
    Price: {
      description: 'The product price',
      example: 10000
    },
    Entities: {
      description: 'The products',
      isArray: true
    }
  }
} as const;
