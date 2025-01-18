export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  publishDate: string;
  status: 'draft' | 'published';
  readTime: string;
  likes: number;
  comments: number;
  tags: string[];
  category: string;
}

export interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string | null;
  content: string;
  createdAt: string;
} 