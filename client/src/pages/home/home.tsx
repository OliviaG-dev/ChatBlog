import './home.css';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import { Post } from '../../services/interface';
import Nav from '../../components/nav/nav';
import Card from '../../components/card/card';
import Pagination from '../../components/pagination/pagination';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

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

  // Calculer les posts à afficher pour la page courante
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Nav />
      <div className="card_wrapper">
        {currentPosts.map((post) => (
          <Card
            key={post._id}
            post={post}
            getCategoryClass={getCategoryClass}
          />
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
