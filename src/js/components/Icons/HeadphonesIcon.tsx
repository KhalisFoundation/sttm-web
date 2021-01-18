import React from 'react';
import { STTM_BLUE } from '@/constants';
import { IconProps } from './IconProps';

const HeadphonesIcon: React.FC<IconProps> = ({fill = STTM_BLUE, width = '64px', height }) => {
  return (
    <svg
      style={{ fill, width, height }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path d="M256 31C115.39 31 0 145.39 0 286v120c0 24.814 20.186 45 45 45h15V301H45c-5.284 0-10.285 1.082-15 2.763V286C30 161.928 131.928 61 256 61s226 100.928 226 225v17.763c-4.715-1.681-9.716-2.763-15-2.763h-15v150h15c24.814 0 45-20.186 45-45V286c0-140.61-115.39-255-256-255z" /><path d="M135 271h-15c-16.569 0-30 13.431-30 30v150c0 16.569 13.431 30 30 30h15c8.284 0 15-6.716 15-15V286c0-8.284-6.716-15-15-15zM392 271h-15c-8.284 0-15 6.716-15 15v180c0 8.284 6.716 15 15 15h15c16.569 0 30-13.431 30-30V301c0-16.569-13.431-30-30-30z" />
    </svg>
  )
}

export default HeadphonesIcon;