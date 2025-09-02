import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Model = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-50 p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-auto rounded-lg bg-white p-4 shadow-lg ">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white bg-blue-500"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Model;