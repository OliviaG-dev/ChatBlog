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
          <label className="editmodal_label">
            Titre:
            <input
              className="editmodal_input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label className="editmodal_label">
            Auteur:
            <input
              className="editmodal_input"
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </label>
          <label className="editmodal_label">
            Catégorie:
            <input
              className="editmodal_input"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </label>
          <label className="editmodal_label">
            Contenu:
            <textarea
              className="editmodal_input"
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
