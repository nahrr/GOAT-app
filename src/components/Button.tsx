import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
  onLoadStyle?: string;
  onClickStyle2v2?: string;
  onClickStyle3v3?: string;
  onClickStyle5v5?: string;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  onLoadStyle,
  onClickStyle2v2,
  onClickStyle3v3,
  onClickStyle5v5,
}) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={
        onLoadStyle +
        " bg-transparent font-semibold py-2 px-4 border text-white " +
        onClickStyle2v2 + " " +
        onClickStyle3v3 + " " +
        onClickStyle5v5 + " " 
      }
    >
      {children}
    </button>
  );
};

export default Button;
