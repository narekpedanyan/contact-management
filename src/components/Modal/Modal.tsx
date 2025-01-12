import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
    title?: string;
    onConfirm?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
 isOpen,
 title = '',
 message,
 onClose,
 onConfirm,
 confirmLabel = 'Confirm',
 cancelLabel = 'Cancel',
}) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">{title}</h2>
                </div>
                <p className="text-xl font-medium text-gray-800 p-4">
                    {message}
                </p>
                <div className="flex justify-end gap-2 p-4 border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        {cancelLabel}
                    </button>
                    {onConfirm && (
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                        >
                            {confirmLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
