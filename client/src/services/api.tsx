import axios from 'axios';
import { Post } from './interface';

const API_URL = 'http://localhost:5000';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${API_URL}/`);
  return response.data;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await axios.get<Post>(`${API_URL}/${id}`);
  return response.data;
};

export const updatePost = async (
  id: string,
  updatedPost: Post
): Promise<Post> => {
  const response = await axios.put<Post>(`${API_URL}/${id}`, updatedPost);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const createPost = async (newPost: Post): Promise<Post> => {
  const response = await axios.post<Post>(`${API_URL}/`, newPost);
  return response.data;
};
