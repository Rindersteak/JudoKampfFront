import React, { FC, ReactNode } from 'react';
import './Modal.scss';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
    size?: 'small' | 'large';
}

const Modal: FC<ModalProps> = ({ onClose, children, size = 'large' }) => {
    return (
        <div className={`modal ${size}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};



export default Modal;
