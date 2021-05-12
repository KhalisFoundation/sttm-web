import { IMultipleShabadsProps } from '@/types/multiple-shabads';

export const isShabadExistMultiview = (shabads: IMultipleShabadsProps[], verseId: number) => shabads.findIndex(e => e.id === verseId) !== -1