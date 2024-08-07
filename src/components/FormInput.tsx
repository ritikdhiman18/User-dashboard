// src/components/common/Form.tsx
import React from 'react';

interface FormProps {
    onSubmit: (e: React.FormEvent) => void;
    children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit} className="p-4 bg-white shadow-md">
            {children}
        </form>
    );
};

export default Form;
