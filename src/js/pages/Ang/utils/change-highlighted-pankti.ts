import { History } from 'history';
import { SOURCES } from '@/constants';
import { toAngURL } from '@/util';
interface IChangeHighlighedPanktiArguments {
  ang: number
  source: keyof typeof SOURCES
  highlight: number
  angData: any
  history: History
}

export const changeHighlightedPankti = ({
  ang,
  source,
  highlight,
  angData,
  history
}: IChangeHighlighedPanktiArguments) => (e: React.KeyboardEventHandler) => {
  if (highlight) {
    if (e.key === 'ArrowDown') {
      const nextHighlightVerse = highlight + 1;
      // If it's last verse we need to load next page
      const isLastVerseOfCurrentPage = highlight === angData.page[angData.page.length - 1].verseId;

      const newUrl = toAngURL({
        ang: isLastVerseOfCurrentPage ? (ang + 1) : ang,
        source,
        highlight: isLastVerseOfCurrentPage ? highlight : nextHighlightVerse
      });

      history.push(newUrl);
    }

    if (e.key === 'ArrowUp') {
      const nextHighlightVerse = highlight - 1;
      const isFirstVerseOfCurrentPage = highlight === angData.page[0].verseId;

      //If it's first verse of current page, we need to load the previous page;
      const newUrl = toAngURL({
        ang: isFirstVerseOfCurrentPage ? (ang - 1) : ang,
        source,
        highlight: isFirstVerseOfCurrentPage ? highlight : nextHighlightVerse
      });

      history.push(newUrl);
    }
  }
}
