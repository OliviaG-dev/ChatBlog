import './editModal.css';
import React, { useState } from 'react';
import { Post } from '../../services/interface';
import { EditModalProps } from '../../services/interface';

const EditModal: React.FC<EditModalProps> = ({ post, onSave, onClose }) => {
  const [formData, setFormData] = useState<Post>({ ...post });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        <form onSubmit={handleSubmit}>
          <label>
            Titre:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Auteur:
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </label>
          <label>
            Catégorie:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </label>
          <label>
            Contenu:
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
            ></textarea>
          </label>
          <div className="editModal_button">
            <button className="secondLink" type="button" onClick={onClose}>
              Annuler
            </button>
            <button className="inactiveLink" type="submit">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
