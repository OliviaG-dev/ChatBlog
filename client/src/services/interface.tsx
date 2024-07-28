export interface Post {
  _id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardProps {
  post: Post;
  getCategoryClass: (category: string) => string;
}

export interface EditModalProps {
  post: Post;
  onSave: (updatedPost: Post) => void;
  onClose: () => void;
}

export interface ModalProps {
  message: string;
  onClose: () => void;
}

export interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}
