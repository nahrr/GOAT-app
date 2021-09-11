import React from "react";

export const activeStyle: string = " bg-green-500";
type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  onLoadStyle?: string;
  buttonStyle?: string | null;
}

const Button = (props: ButtonProps) => {

  const activeStyle: string = "bg-green-500"
  return (
   
    <button
      onClick={() => {
        props.onClick();
      }}
      className={
        `bg-transparent font-semibold py-2 px-4 border text-white ${props.buttonStyle}`
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
