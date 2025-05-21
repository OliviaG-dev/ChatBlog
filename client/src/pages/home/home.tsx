import './home.css';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import { Post } from '../../services/interface';
import Nav from '../../components/nav/nav';
import Card from '../../components/card/card';
import Pagination from '../../components/pagination/pagination';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        console.log('Fetched posts:', data);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryClass = (category: string | undefined) => {
    console.log('Category value:', category);
    if (!category || typeof category !== 'string') {
      console.log('Returning default class');
      return 'card_top_tag';
    }
    const categoryClass = category.replace(/\s+/g, '-');
    return `card_top_tag ${categoryClass}`;
  };

  // Filtrer les posts valides avant la pagination
  const validPosts = posts.filter(
    (post) => post && post._id && post.title && post.author && post.content
  );

  // Calculer les posts à afficher pour la page courante
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = validPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Nav />
      <div className="card_wrapper">
        {currentPosts.length === 0 ? (
          <div className="no-data-message">
            Nous n'avons pas trouvé la donnée
          </div>
        ) : (
          currentPosts.map((post) => (
            <Card
              key={post._id}
              post={post}
              getCategoryClass={getCategoryClass}
            />
          ))
        )}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={validPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
