import React from 'react';

interface CalloutIconProps {
  width?: string | number;
  className?: string;
}

export const CalloutIcon: React.FC<CalloutIconProps> = ({
  width = 24,
  className,
}) => {
  return (
    <svg
      height={width}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
    >
      <path
        id="chats"
        d="m19.97 20.96-1.94-.65a1.518 1.518 0 0 0 -1.11.04 6.951 6.951 0 0 1 -7.845-1.381.3.3 0 0 1 .229-.5 8.524 8.524 0 0 0 9.166-9.169c-.048-.286.3-.454.58-.13a7 7 0 0 1 1.3 7.75c-.422.74.44 2.322.61 3.05a.785.785 0 0 1 -.99.99zm-2.97-10.96a7 7 0 1 0 -14 0 6.925 6.925 0 0 0 .646 2.924 1.5 1.5 0 0 1 .046 1.1l-.653 1.944a.783.783 0 0 0 .988.988l1.944-.653a1.5 1.5 0 0 1 1.1.046 6.925 6.925 0 0 0 2.929.651 7 7 0 0 0 7-7z"
      ></path>
    </svg>
  );
};
