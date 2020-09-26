import { createContext } from 'react';

export const MahankoshContext = createContext<
  {
    selectedWord: string,
    currentLine: number,
    selectedLine: number,
    selectedWordIndex: number,
    setMahankoshInformation: Function,
  }
>({
  selectedWord: '',
  selectedLine: -1,
  currentLine: 0,
  selectedWordIndex: -1,
  setMahankoshInformation: () => { }
});