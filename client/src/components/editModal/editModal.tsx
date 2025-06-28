import './editModal.css';
import React, { useState, useEffect } from 'react';
import { Post } from '../../services/interface';
import { EditModalProps } from '../../services/interface';
import { fetchPosts } from '../../services/api';

const EditModal: React.FC<EditModalProps> = ({ post, onSave, onClose }) => {
  const [formData, setFormData] = useState<Post>({ ...post });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const posts = await fetchPosts();
      const uniqueCategories = Array.from(
        new Set(posts.map((p) => p.category).filter(Boolean))
      );
      setCategories(uniqueCategories);
    };
    getCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="editmodal_container">
      <div className="editmodal_content">
        <h2 className="editmodal_title">Éditer le post</h2>
        <form className="editmodal_form" onSubmit={handleSubmit}>
          <div className="editmodal_group">
            <label className="editmodal_label" htmlFor="edit-title">
              Titre :
            </label>
            <input
              className="editmodal_input"
              id="edit-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="editmodal_group">
            <label className="editmodal_label" htmlFor="edit-author">
              Auteur :
            </label>
            <input
              className="editmodal_input"
              id="edit-author"
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div className="editmodal_group">
            <label className="editmodal_label" htmlFor="edit-category">
              Catégorie :
            </label>
            <select
              className="editmodal_input"
              id="edit-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="editmodal_group">
            <label className="editmodal_label" htmlFor="edit-content">
              Contenu :
            </label>
            <textarea
              className="editmodal_input"
              id="edit-content"
              name="content"
              value={formData.content}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="editModal_button">
            <button className="btn-cancel" type="button" onClick={onClose}>
              Annuler
            </button>
            <button className="btn-save" type="submit">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
