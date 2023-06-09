export const parseSemanticData = (semanticData, verseIdList) => {
  const parsedData = {};
  parsedData.verses = semanticData.shabads.map((shabadObj) => {
    const { source, raag, writer } = shabadObj.shabadInfo;
    shabadObj.verses = shabadObj.verses.reduce((filteredVerses, verseObj) => {
      if (verseIdList.includes(verseObj.verseId)) {
        verseObj = { ...verseObj, source, raag, writer };
        filteredVerses.push(verseObj);
      }
      return filteredVerses;
    }, []);
    return shabadObj.verses;
  }).flat(1);
  return parsedData;
}
