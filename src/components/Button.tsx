import { Component, ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      className="btn w-full tracking-wider bg-[#678983] text-[#f0e9d2]"
      {...props}
    >
      {props.label}
    </button>
  );
};

export default Button;
