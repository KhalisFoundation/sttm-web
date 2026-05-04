import React from 'react';

interface ExclamationIconProps {
  width?: string | number;
  className?: string;
}

export const ExclamationIcon: React.FC<ExclamationIconProps> = ({
  width = 24,
  className,
}) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.625,18.562l-9.188-15.906C13.95,1.762,13.033,1.234,12,1.234c-1.033,0-1.95,0.528-2.437,1.422L0.375,18.562
		c-0.488,0.894-0.488,1.962,0,2.856c0.488,0.894,1.405,1.422,2.437,1.422h18.376c1.033,0,1.95-0.528,2.437-1.422
		C24.113,20.524,24.113,19.456,23.625,18.562z M22.429,20.667c-0.244,0.447-0.703,0.712-1.188,0.712H2.812
		c-0.485,0-0.944-0.265-1.188-0.712c-0.244-0.447-0.244-0.981,0-1.428L10.804,3.359c0.244-0.447,0.703-0.712,1.188-0.712
		c0.485,0,0.944,0.265,1.188,0.712l9.18,15.88C22.673,19.686,22.673,20.22,22.429,20.667z"
      />
      <rect x="11.3" y="8.26" width="1.4" height="7.04" />
      <circle cx="12" cy="16.7" r="0.94" />
    </svg>
  );
};
