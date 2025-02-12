import { Entity, PostType, PostState, Post, StorableEntity } from '@backend/shared/core';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public type: PostType;
  public publishDate: Date;
  public state: PostState;
  public userId: string;
  public title: string;
  public url: string;
  public previewText: string;
  public text: string;
  public quoteText: string;
  public quoteAuthor: string;
  public imagePath: string;
  public linkDescription: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(post?: Post) {
    super();

    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.type = post.type;
    this.publishDate = post.publishDate ?? undefined;
    this.state = post.state ?? undefined;
    this.userId = post.userId ?? undefined;
    this.title = post.title ?? undefined;
    this.url = post.url ?? undefined;
    this.previewText = post.previewText ?? undefined;
    this.text = post.text ?? undefined;
    this.quoteText = post.quoteText ?? undefined;
    this.quoteAuthor = post.quoteAuthor ?? undefined;
    this.imagePath = post.imagePath ?? undefined;
    this.linkDescription = post.linkDescription ?? undefined;
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      type: this.type,
      publishDate: this.publishDate,
      state: this.state,
      userId: this.userId,
      title: this.title,
      url: this.url,
      previewText: this.previewText,
      text: this.text,
      quoteText: this.quoteText,
      quoteAuthor: this.quoteAuthor,
      imagePath: this.imagePath,
      linkDescription: this.linkDescription,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
