import React, { FC, ReactNode, useEffect } from "react";
import "./Modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  size?: "small" | "large" | "xxl";
}


const Modal: FC<ModalProps> = ({ onClose, children, size = "large" }) => {
  useEffect(() => {
    // Disable scrolling on the background when the modal is opened
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on the background when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={`modal ${size}`}>
      <div className="modal-content">
        <div className="closeModalButtonContainer">
          <FontAwesomeIcon
            icon={faClose}
            onClick={onClose}
            className="closeModalButton"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
