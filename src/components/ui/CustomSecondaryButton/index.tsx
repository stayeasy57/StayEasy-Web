import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const CustomSecondaryButton = (props: Props) => {
  const { children, onClick } = props;

  return (
    <button
      onClick={onClick}
      className="bg-white text-primary cursor-pointer py-1.5 px-4 text-sm font-medium"
    >
      {children}
    </button>
  );
};

export default CustomSecondaryButton;
