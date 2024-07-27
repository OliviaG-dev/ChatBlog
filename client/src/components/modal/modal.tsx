import './modal.css';
import { ModalProps } from '../../services/interface';

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="modal_backdrop">
      <div className="modal_content">
        <h2>{message}</h2>
        <button className="inactiveLink" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
