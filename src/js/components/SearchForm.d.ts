import React from 'react';

interface SearchFormRenderProps {
  pattern: string;
  disabled: boolean;
  title: string;
  className: string;
  displayGurmukhiKeyboard: boolean;
  query: string;
  action: string;
  name: string;
  placeholder: string;
  inputType: string;
  type: number;
  source: string;
  writer: string | number;
  writers: any[];
  isSourceChanged: boolean;
  isWriterChanged: boolean;
  isShowKeyboard: boolean;
  autoDetectGurmukhi: boolean;
  setQueryAs: (value: string) => () => void;
  setGurmukhiKeyboardVisibilityAs: (value: boolean) => () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSourceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearchTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchWriterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => boolean;
  handleReset: (e: React.MouseEvent) => void;
  handleAutoDetectGurmukhiToggle: () => void;
}

interface SearchFormProps {
  children: (props: SearchFormRenderProps) => React.ReactNode;
  defaultQuery?: string;
  defaultType?: number;
  defaultSource?: string;
  defaultWriter?: number;
  defaultAutoDetectGurmukhi?: string;
  submitOnChangeOf?: Array<'type' | 'source' | 'query' | 'writer'>;
  onSubmit?: (data: { source: string; type: number; query: string; writer: string | number }) => void;
}

declare class SearchForm extends React.PureComponent<SearchFormProps> {
  static getFormDetails: (type: number) => [string, string, string];
}

export default SearchForm;
