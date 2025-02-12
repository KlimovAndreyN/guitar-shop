import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface Post {
  id?: string;
  type: PostType;
  publishDate?: Date;
  state: PostState;
  userId: string;
  title?: string;           // types: video, text
  url?: string;             // types: video, link
  previewText?: string;     // types: text
  text?: string;            // types: text
  quoteText?: string;       // types: quote
  quoteAuthor?: string;     // types: quote
  imagePath?: string;       // types: photo
  linkDescription?: string; // types: link
  createdAt?: Date;
  updatedAt?: Date;
}
