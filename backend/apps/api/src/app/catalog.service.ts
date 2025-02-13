import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { join } from 'path/posix';

import { dtoToFormData, fillDto, makeHeaders, makeUrl, multerFileToFormData } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

import { UserService } from './user.service';

@Injectable()
export class CatalogService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>,
    private userService: UserService
  ) { }

  /*
    public getPostsUrl(route = '', query: object = null): string {
      return makeUrl(this.apiOptions.blogPostServiceUrl, RouteAlias.Posts, route, query);
    }
  
    public async createOrUpdate(
      postId: string,
      dto: CreatePostDto | UpdatePostDto,
      requestId: string,
      userId: string,
      imageFile?: Express.Multer.File
    ): Promise<DetailPostWithUserRdo> {
      const url = this.getPostsUrl();
      const formData = new FormData();
      const headers = makeHeaders(requestId, null, userId);
  
      dtoToFormData(dto, formData);
  
      if (imageFile) {
        multerFileToFormData(imageFile, formData, ImageOption.KEY);
      }
  
      const { data: post } =
        (!postId)
          ? await this.httpService.axiosRef.post<DetailPostWithUserIdRdo>(url, formData, headers)
          : await this.httpService.axiosRef.patch<DetailPostWithUserIdRdo>(join(url, postId), formData, headers);
      const postWithUser = this.fillUserOnPost(post, requestId);
  
      return postWithUser;
    }
  
    public async fillUserOnPostArray(posts: PostWithUserIdRdo[], requestId: string): Promise<PostWithUserRdo[]> {
      if (!posts.length) {
        return [];
      }
  
      const items: PostWithUserRdo[] = [];
      const users = new Map<string, UserRdo>();
  
      for (const post of posts) {
        const { userId } = post;
  
        if (!users.has(userId)) {
          users.set(userId, await this.userService.getUser(userId, requestId));
        }
  
        items.push(fillDto(PostWithUserRdo, { ...post, user: users.get(userId) }));
      }
  
      return items;
    }
  
    public async fillUserOnPostPagination(data: PostWithUserIdAndPaginationRdo, requestId: string): Promise<PostWithUserAndPaginationRdo> {
      const { entities, currentPage, itemsPerPage, totalItems, totalPages } = data;
      const posts = await this.fillUserOnPostArray(entities, requestId);
  
      return { entities: posts, currentPage, itemsPerPage, totalItems, totalPages };
    }
  */
}
