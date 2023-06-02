export const parseSemanticData = (semanticData, verseIdList) => {
  const parsedData = {};
  parsedData.verses = semanticData.shabads.map((shabadObj) => {
    const { shabadInfo } = shabadObj;
    shabadObj.verses = shabadObj.verses.reduce((filteredVerses, verseObj) => {
      if (verseIdList.includes(verseObj.verseId)) {
        verseObj.source = shabadInfo.source;
        verseObj.raag = shabadInfo.raag;
        verseObj.writer = shabadInfo.writer;
        filteredVerses.push(verseObj);
      }
      return filteredVerses;
    }, []);
    return shabadObj.verses;
  }).flat(1);
  return parsedData;
}
