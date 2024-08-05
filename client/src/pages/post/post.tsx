import './post.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost, deletePost } from '../../services/api';
import { Post as PostInterface } from '../../services/interface';
import Nav from '../../components/nav/nav';
import EditModal from '../../components/editModal/editModal';
import Card from '../../components/card/card';
import Modal from '../../components/modal/modal';

function Post() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostInterface | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Nouvel état pour la modal de suppression
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await fetchPostById(id);
          setPost(data);
        } catch (error) {
          console.error(`Error fetching post with ID ${id}:`, error);
        }
      }
    };
    fetchData();
  }, [id]);

  const getCategoryClass = (category: string) => {
    const categoryClass = category.replace(/\s+/g, '-');
    return `card_top_tag ${categoryClass}`;
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async () => {
    if (id) {
      try {
        await deletePost(id);
        setModalMessage('Post supprimé avec succès!');
        setIsDeleteModalOpen(true); // Ouvrir la modal de suppression
      } catch (error) {
        console.error(`Error deleting post with ID ${id}:`, error);
      }
    }
  };

  const handleEditSave = async (updatedPost: PostInterface) => {
    if (id) {
      try {
        const data = await updatePost(id, updatedPost);
        setPost(data);
        setIsEditModalOpen(false);
        navigate('/');
      } catch (error) {
        console.error(`Error updating post with ID ${id}:`, error);
      }
    }
  };

  const handleDeleteModalClose = () => {
    setModalMessage(null);
    setIsDeleteModalOpen(false);
    navigate('/'); // Naviguer après la fermeture de la modal
  };

  if (!post) return <div>Loading...</div>;
  return (
    <>
      <Nav />
      <div className="post_container">
        <Card post={post} getCategoryClass={getCategoryClass} />
        <div className="post_button">
          <button className="secondLink" onClick={handleEditClick}>
            Éditer
          </button>
          <button className="inactiveLink" onClick={handleDeleteClick}>
            Supprimer
          </button>
        </div>

        {isEditModalOpen && (
          <EditModal
            post={post}
            onSave={handleEditSave}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </div>

      {modalMessage && isDeleteModalOpen && (
        <Modal message={modalMessage} onClose={handleDeleteModalClose} />
      )}
    </>
  );
}

export default Post;
