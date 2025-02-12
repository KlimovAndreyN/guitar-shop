import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaClientService } from '@backend/catalog/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { PaginationResult, Post, PostState, PostType, SortDirection, SortType } from '@backend/shared/core';

import { BlogPostEntity } from './product.entity';
import { BlogPostFactory } from './product.factory';
import { BlogPostQuery } from './query/product.query';
import { BlogPostMessage } from './product.constant';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private getTypeAndState({ type, state }): { type: PostType, state: PostState } {
    return { type: type as PostType, state: state as PostState };
  }

  private getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private async findPosts(
    where: Prisma.PostWhereInput,
    orderBy: Prisma.PostOrderByWithRelationInput = undefined,
    skip: number = undefined,
    take: number = undefined
  ): Promise<BlogPostEntity[]> {
    const records = await this.client.post.findMany({ where, orderBy, skip, take });
    const entities = records.map(
      (record) => {
        const post: Post = {
          ...record,
          ...this.getTypeAndState(record)
        };

        return this.createEntityFromDocument(post);
      }
    );

    return entities;
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const record = await this.client.post.findFirst({ where: { id } });

    if (!record) {
      throw new NotFoundException(BlogPostMessage.NotFound);
    }

    const post: Post = {
      ...record,
      ...this.getTypeAndState(record)
    };

    return this.createEntityFromDocument(post);
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: { ...pojoEntity }
    });

    entity.id = record.id;
    entity.publishDate = record.publishDate;
  }

  public async update(entity: BlogPostEntity): Promise<void> {
    const { id } = entity;
    const pojoEntity = entity.toPOJO();
    const publishDate = new Date(pojoEntity.publishDate);

    await this.client.post.update({
      where: { id },
      data: {
        ...pojoEntity,
        publishDate
      }
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({ where: { id } })
  }

  public async find(query: BlogPostQuery, showDraft: boolean, take: number): Promise<PaginationResult<BlogPostEntity>> {
    const currentPage = query.page;
    const skip = (currentPage - 1) * take;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query.userIds) {
      where.userId = { in: query.userIds };
    }

    if (query.type) {
      where.type = query.type;
    }

    if (showDraft) {
      where.state = PostState.Draft;
    } else {
      where.state = PostState.Published;
    }

    switch (query.sortType) {
      case SortType.PublishDate:
        orderBy.publishDate = SortDirection.Desc;
        break;
      case SortType.CreateDate:
        orderBy.createdAt = SortDirection.Desc;
        break;
      case SortType.Comments:
        orderBy.commentsCount = SortDirection.Desc;
        break;
      case SortType.Likes:
        orderBy.likesCount = SortDirection.Desc;
        break;
    }

    const [entities, postCount] = await Promise.all(
      [
        this.findPosts(where, orderBy, skip, take),
        this.getPostCount(where)
      ]
    );

    return {
      entities,
      currentPage,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount
    }
  }

  public async updateCommentsCount(id: string, step: number): Promise<void> {
    const { commentsCount } = await this.client.post.findFirst({ select: { commentsCount: true }, where: { id } });

    await this.client.post.update({
      where: { id },
      data: { commentsCount: commentsCount + step }
    });
  }

  public async updateLikesCount(id: string, step: number): Promise<void> {
    const { likesCount } = await this.client.post.findFirst({ select: { likesCount: true }, where: { id } });

    await this.client.post.update({
      where: { id },
      data: { likesCount: likesCount + step }
    });
  }

  public async getUserPostsCount(userId: string): Promise<number> {
    const postsCount = await this.client.post.count({ where: { userId } });

    return postsCount;
  }

  public async existsRepost(postId: string, userId: string): Promise<boolean> {
    const count = await this.client.post.count({ where: { repostedPostId: postId, userId } });

    return count > 0;
  }

  public async findPostsByCreateAt(startDate: Date, limit: number): Promise<BlogPostEntity[]> {
    const where: Prisma.PostWhereInput = {};

    if (startDate) {
      where.createdAt = { gt: startDate };
    }

    const entities = await this.findPosts(where, undefined, undefined, limit);

    return entities;
  }
}
