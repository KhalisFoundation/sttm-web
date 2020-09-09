import { IMahankoshData } from '@/types';

export const getMahankoshExplaination = (mahankoshData: IMahankoshData[], isLoading: boolean) => {
  if (isLoading) {
    return '.....'
  }

  if (mahankoshData.length > 0) {
    const explaination = mahankoshData[0].definition;
    return explaination.length > 200 ? explaination.substr(0, 200) + '...' : explaination;
  }

  return '';
}