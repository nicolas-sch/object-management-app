import React from "react";
import "../styles/modal.css";

// Defining the types for the props that Modal will receive
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Modal component to display content in a modal window
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // If the modal is not open, return null (don't render anything)
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
