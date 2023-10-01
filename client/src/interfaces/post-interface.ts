export interface postInterface {
  creationDate: number;
  postId: string;
  creator: string;
  content: string;
  interactions: { likes: number; comments: []; donations: number };
}
