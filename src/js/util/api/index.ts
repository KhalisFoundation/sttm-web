import { IShabadInfo, IKhajanaAPIResponse } from '@/types';

export const shabadInfoMapper = (
  shabadInfo: IShabadInfo
): IKhajanaAPIResponse['shabadinfo'] => ({
  source: {
    id: shabadInfo.source.sourceId,
    pageno: String(shabadInfo.pageNo),
  },
  id: String(shabadInfo.shabadId),
  raag: shabadInfo.raag,
  writer: shabadInfo.writer,
});
