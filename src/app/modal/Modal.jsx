import { useEffect } from 'react';
import styles from './modal.module.css';

const Modal = ({ show, onClose, children }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlayOfFirebase} >
      <div className={styles.triggercloseOfOverlay} onClick={onClose}></div>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
