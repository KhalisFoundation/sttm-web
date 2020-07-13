
export const getHighlightingEndpoints = (baani, query) => {
  const startChar = baani.indexOf(query);
  let start;
  let end;
  const baaniWords = baani.split(' ');
  let manualCount = 0;
  if (startChar !== -1) {
    for (const wordcount in baaniWords) {
      [...baaniWords[wordcount]].forEach(() => {
        if (manualCount === startChar) {
          start = parseInt(wordcount, 10);
        }
        manualCount++;
      });
      manualCount++; // Counts the space in baani string
    }
    end = start + (query.split(" ").length - 1);
    return [start, end];
  }
  return [-1, -1]
}
