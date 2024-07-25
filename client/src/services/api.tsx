import axios from 'axios';
import { Post } from './interface';

const API_URL = 'http://localhost:5000';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${API_URL}/`);
  return response.data;
};
