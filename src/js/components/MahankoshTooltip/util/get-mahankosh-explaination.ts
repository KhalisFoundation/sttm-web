import { IMahankoshExplaination } from '@/types';

export const getMahankoshExplaination = (mahankoshExplaination: IMahankoshExplaination[]) => {

  if (mahankoshExplaination.length > 0) {
    const explaination = mahankoshExplaination[0].definition;
    return explaination.length > 200 ? explaination.substr(0, 200) + '...' : explaination;
  }

  return '';
}