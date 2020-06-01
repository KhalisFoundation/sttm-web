import React from 'react';

export const Clock = (props) =>
  (<svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 100 100"
    transform="rotate(360)"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M50 22.44c15.198 0 27.56 12.367 27.56 27.562 0 15.197-12.362 27.559-27.56 27.559-15.199 0-27.561-12.362-27.561-27.559C22.439 34.806 34.801 22.44 50 22.44m0-9.94c-20.712 0-37.5 16.792-37.5 37.502S29.288 87.5 50 87.5s37.5-16.788 37.5-37.498C87.5 29.292 70.712 12.5 50 12.5z" /><path fill="#626262" d="M69.195 36.068l-3.897-3.902c-.743-.747-2.077-.729-2.791 0L50.022 44.654l-6.863-6.863c-.743-.743-2.046-.743-2.789 0l-3.892 3.893a1.967 1.967 0 00-.585 1.402c0 .525.204 1.025.578 1.394l12.133 12.133c.374.374.869.578 1.396.578h.078a1.96 1.96 0 001.364-.578l17.754-17.754a1.976 1.976 0 00-.001-2.791z" />
  </svg>)