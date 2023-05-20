import React, { FC, ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};



export default Modal;
