export interface postInterface {
  postId: string;
  creator: string;
  content: string;
  interactions: { likes: number; comments: []; donations: number };
}
