import React from 'react';

interface CommentIconProps {
  width?: string | number;
  className?: string;
}

export const CommentIcon: React.FC<CommentIconProps> = ({
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
        id="message-plus-alt"
        d="m18 3h-12a2.652 2.652 0 0 0 -3 3v15l3-3h12a2.652 2.652 0 0 0 3-3v-9a2.652 2.652 0 0 0 -3-3zm-3 8.25h-2.25v2.25a.75.75 0 0 1 -1.5 0v-2.25h-2.25a.75.75 0 0 1 0-1.5h2.25v-2.25a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5z"
      ></path>
    </svg>
  );
};
