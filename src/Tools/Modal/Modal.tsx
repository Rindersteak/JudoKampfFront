import React, { FC, ReactNode } from 'react';
import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
    size?: 'small' | 'large';
}

const Modal: FC<ModalProps> = ({ onClose, children, size = 'large' }) => {
    return (
        <div className={`modal ${size}`}>
            <div className="modal-content">
                <div className='closeModalButtonContainer'>
                <FontAwesomeIcon icon={faClose} onClick={onClose} className='closeModalButton'/>
                </div>
                {children}
            </div>
        </div>
    );
};



export default Modal;
