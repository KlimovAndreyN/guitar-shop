import { ApiPropertyOption } from './api-property-option';

export const ApiParamOption = {
  PostId: {
    name: 'postId',
    schema: ApiPropertyOption.Post.Id
  }
} as const;

export const POST_ID_PARAM = `:${ApiParamOption.PostId.name}`;
