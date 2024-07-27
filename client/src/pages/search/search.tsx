import { useState, useEffect } from 'react';
import './search.css';
import Nav from '../../components/nav/nav';
import { fetchPosts } from '../../services/api';
import { Post } from '../../services/interface';
import Card from '../../components/card/card';
import icone_rechercher from '../../assets/icone_rechercher.png';
import icone_pas_trouve from '../../assets/icone_pas_trouve.png';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchDone, setSearchDone] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  useEffect(() => {
    if (searchTerm || selectedCategory) {
      const filtered = posts.filter(
        (post) =>
          (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (!selectedCategory || post.category === selectedCategory)
      );
      setFilteredPosts(filtered);
      setSearchDone(true);
    } else {
      setSearchDone(false);
    }
  }, [searchTerm, selectedCategory, posts]);

  const uniqueCategories = Array.from(
    new Set(posts.map((post) => post.category))
  );

  const getCategoryClass = (category: string) => {
    const categoryClass = category.replace(/\s+/g, '-'); // Remplacer les espaces par des tirets pour la classe CSS
    return `card_top_tag ${categoryClass}`;
  };

  return (
    <>
      <Nav />
      <h2 className="search_title">Chat perdu ? Chat trouvé !</h2>
      <div className="search_searchbar">
        <img
          className="search_searchbar_img"
          src={icone_rechercher}
          alt="chat qui cherche"
        />
        <input
          className="search_searchbar_input"
          type="text"
          placeholder="Titre ou auteur"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="search_tags">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`search_tag ${getCategoryClass(category)} ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <button
          className={`search_tag ${selectedCategory === null ? 'selected' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
      </div>

      {searchDone && (
        <div className="search_post">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card
                key={post._id}
                post={post}
                getCategoryClass={getCategoryClass}
              />
            ))
          ) : (
            <div className="search_nofound">
              Aucun résultat trouvé...{' '}
              <img
                className="search_nofound_img"
                src={icone_pas_trouve}
                alt="chat triste"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Search;
