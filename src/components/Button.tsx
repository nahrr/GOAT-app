import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ children, onClick }) => {

  return (
    <button
      onClick={onClick}
      className=
        "bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded focus:bg-green-500 focus:text-white"
      
    >
      {children}
    </button>
  );
};

export default Button;
