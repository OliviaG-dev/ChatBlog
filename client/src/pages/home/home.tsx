import './home.css';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import { Post } from '../../services/interface';
import Nav from '../../components/nav/nav';
import Card from '../../components/card/card';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    fetchData();
  }, []);

  const getCategoryClass = (category: string) => {
    const categoryClass = category.replace(/\s+/g, '-'); // Remplacer les espaces par des tirets pour la classe CSS
    return `card_top_tag ${categoryClass}`;
  };

  return (
    <div>
      <Nav />
      <div className="card_wrapper">
        {posts.map((post) => (
          <Card
            key={post._id}
            post={post}
            getCategoryClass={getCategoryClass}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
