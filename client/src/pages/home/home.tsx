import './home.css';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import { Post } from '../../services/interface';
import { formatDate } from '../../utils/formatDates';
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

  const getCategoryClass = (category: string) => {
    const categoryClass = category.replace(/\s+/g, '-'); // Remplacer les espaces par des tirets pour la classe CSS
    return `card_top_tag ${categoryClass}`;
  };

  return (
    <div>
      <Nav />
      <div className="card_wrapper">
        {posts.map((post) => (
          <article key={post.title} className="card">
            <h2 className="card_title">{post.title}</h2>
            <div className="card_top">
              <p className="card_top_author">
                {' '}
                <span className="card_top_author-span">Auteur : </span>
                {post.author}
              </p>
              <div className={getCategoryClass(post.category)}>
                {post.category}
              </div>
            </div>
            <p className="card_content">{post.content}</p>
            <div className="card_date_wrapper">
              <p className="card_date">Créé le: {formatDate(post.createdAt)}</p>
              {post.updatedAt && post.updatedAt !== post.createdAt && (
                <p className="card_date">
                  Mis à jour le: {formatDate(post.updatedAt)}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
