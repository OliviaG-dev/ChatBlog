import { useState } from 'react';
import './add.css';
import Nav from '../../components/nav/nav';
import { createPost } from '../../services/api';
import { Post } from '../../services/interface';
import Modal from '../../components/modal/modal';

const categories = [
  'Science-fiction',
  'Psychologie Animale',
  'Technologie',
  'Philosophie',
  'Bien-être',
  'Médias Sociaux',
  'Histoire',
  'Science',
];

function Add() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [content, setContent] = useState('');
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      _id: '',
      title,
      author,
      category,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await createPost(newPost);
      setModalMessage('Post créé avec succès!');
      setTitle('');
      setAuthor('');
      setCategory(categories[0]);
      setContent('');
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
      setModalMessage('Erreur lors de la création du post.');
    }
  };

  return (
    <>
      <Nav />
      <h2 className="add_title">Créer un nouveau post</h2>
      <form className="add_form" onSubmit={handleSubmit}>
        <div className="form_group">
          <label className="form_group_label" htmlFor="title">
            Titre:
          </label>
          <input
            className="form_group_input"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form_group">
          <label className="form_group_label" htmlFor="author">
            Auteur:
          </label>
          <input
            className="form_group_input"
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form_group">
          <label className="form_group_label" htmlFor="category">
            Catégorie:
          </label>
          <select
            className="form_group_input"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form_group">
          <label className="form_group_label" htmlFor="content">
            Contenu:
          </label>
          <textarea
            className="form_group_input"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="inactiveLink add_form_button" type="submit">
          Ajouter
        </button>
      </form>
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
      )}
    </>
  );
}

export default Add;
