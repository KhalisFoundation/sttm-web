import { IMahankoshData } from '@/types';

export const getMahankoshExplaination = (mahankoshData: IMahankoshData[], isLoading: boolean) => {
  if (isLoading) {
    return 'loading...'
  }

  if (mahankoshData.length > 0) {
    return mahankoshData[0].definition.substr(0, 200) + '...';
  }

  return '';
}