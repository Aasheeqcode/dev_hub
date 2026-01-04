export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  likes: number;
  likedByMe: boolean;
  comments: Comment[]; // New array for comments
}