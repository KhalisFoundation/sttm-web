type DiffPart = {
  type: 'same' | 'added' | 'removed';
  value: string;
};

export const diffWords = (
  originalText: string,
  editedText: string
): DiffPart[] => {
  const originalWords = originalText.split(' ');
  const editedWords = editedText.split(' ');

  const originalCount = originalWords.length;
  const editedCount = editedWords.length;

  const lcsMatrix: number[][] = Array.from({ length: originalCount + 1 }, () =>
    Array(editedCount + 1).fill(0)
  );

  for (let row = 1; row <= originalCount; row++) {
    for (let col = 1; col <= editedCount; col++) {
      const wordsMatch = originalWords[row - 1] === editedWords[col - 1];

      if (wordsMatch) {
        lcsMatrix[row][col] = lcsMatrix[row - 1][col - 1] + 1;
      } else {
        lcsMatrix[row][col] = Math.max(
          lcsMatrix[row - 1][col],
          lcsMatrix[row][col - 1]
        );
      }
    }
  }

  const diffResult: DiffPart[] = [];
  let originalPointer = originalCount;
  let editedPointer = editedCount;

  while (originalPointer > 0 || editedPointer > 0) {
    const isWithinBounds = originalPointer > 0 && editedPointer > 0;
    const wordsMatch =
      isWithinBounds &&
      originalWords[originalPointer - 1] === editedWords[editedPointer - 1];

    if (wordsMatch) {
      diffResult.unshift({
        type: 'same',
        value: originalWords[originalPointer - 1],
      });
      originalPointer--;
      editedPointer--;
    } else {
      const canMoveLeft = editedPointer > 0;
      const moveLeftIsBetter =
        originalPointer === 0 ||
        (canMoveLeft &&
          lcsMatrix[originalPointer][editedPointer - 1] >=
            lcsMatrix[originalPointer - 1][editedPointer]);

      if (moveLeftIsBetter) {
        diffResult.unshift({
          type: 'added',
          value: editedWords[editedPointer - 1],
        });
        editedPointer--;
      } else {
        diffResult.unshift({
          type: 'removed',
          value: originalWords[originalPointer - 1],
        });
        originalPointer--;
      }
    }
  }

  return diffResult;
};

export const renderDiffHTML = (diff: DiffPart[]) => {
  return diff
    .map((part: DiffPart) => {
      if (part.type === 'same') {
        return part.value;
      }

      if (part.type === 'removed') {
        return `<span class="deleted-word">${part.value}</span>`;
      }

      if (part.type === 'added') {
        return `<span class="new-word">${part.value}</span>`;
      }

      return '';
    })
    .join(' ');
};
