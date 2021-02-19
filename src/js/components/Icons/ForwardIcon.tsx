import React from 'react';
import { STTM_BLUE } from '@/constants';
import { IconProps } from './IconProps';

const ForwardIcon:React.FC<IconProps> = ({ fill = STTM_BLUE, width = 18, height }) => {
  return (
    <svg style={{ fill, width, height }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.807 491.807">
        <path d="M485.802 221.184l-184.32-184.32a20.506 20.506 0 00-22.323-4.444c-7.659 3.154-12.636 10.65-12.636 18.924v82.002c-117.842 4.833-220.651 84.398-253.583 198.41C-1.314 381.195-.208 421.356.201 436.491l.082 3.973c0 9.216 6.164 17.306 15.032 19.743 1.823.492 3.645.737 5.448.737a20.51 20.51 0 0017.592-9.994c81.121-136.356 188.6-140.227 228.168-136.376v105.411c0 8.274 4.977 15.77 12.636 18.924 7.68 3.195 16.466 1.413 22.323-4.444l184.32-184.32c8.007-8.01 8.007-20.954 0-28.961z"/>
    </svg>
  )
}

export default ForwardIcon;