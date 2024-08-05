import './card.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDates';
import { CardProps } from '../../services/interface';

const Card: React.FC<CardProps> = ({ post, getCategoryClass }) => {
  return (
    <article className="card">
      <Link className="card_link" to={`/${post._id}`}>
        <h2 className="card_title">{post.title}</h2>
        <div className="card_top">
          <p className="card_top_author">
            <span className="card_top_author-span">Auteur : </span>
            {post.author}
          </p>
          <div className={getCategoryClass(post.category)}>{post.category}</div>
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
      </Link>
    </article>
  );
};

export default Card;
