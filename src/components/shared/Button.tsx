import React from "react";

interface ButtonProps {
  label: string;
}

function Button({ label }: ButtonProps) {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return <button onClick={handleClick}>{label}</button>;
}

export default Button;
