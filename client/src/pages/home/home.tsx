import './home.css';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import { Post } from '../../services/interface';
import Nav from '../../components/nav/nav';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Nav />
      <h1>Je Suis une Home</h1>
      {posts.map((post) => (
        <div key={post.title}>
          <h2>{post.title}</h2>
          <p>{post.author}</p>
          <p>{post.category}</p>
          <p>{post.content}</p>
          <p>{post.createdAt}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
