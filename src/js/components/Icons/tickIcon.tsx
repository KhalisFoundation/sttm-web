import React from 'react';

interface TickIconProps {
  width?: string | number;
  className?: string;
}

export const TickIcon: React.FC<TickIconProps> = ({ className, width = 24 }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={className}
    >
      <circle cx="12" cy="12" r="10" strokeWidth="1.5" fill="none" />
      <path
        d="M7 12l3 3 6-6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
