// src/components/common/Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-4 shadow-lg">
                <button onClick={onClose} className="mb-4 text-red-500">Close</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
