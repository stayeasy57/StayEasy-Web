import React from "react";

type Props = {
  children: React.ReactNode;
};

const CustomSecondaryButton = (props: Props) => {
  const { children } = props;

  return (
    <button className="bg-white text-primary cursor-pointer py-1.5 px-4 text-sm font-medium">
      {children}
    </button>
  );
};

export default CustomSecondaryButton;
