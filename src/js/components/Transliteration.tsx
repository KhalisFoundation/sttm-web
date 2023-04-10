import React from 'react';

interface IProps {
  language?: string,
  children: string,
  fontSize?: string | number,
  isReadingMode?: boolean,
}

const Transliteration: React.FC<IProps> = (props: IProps) => {
  const defaultFontSize = '18px'
  const { fontSize: _fontSize, language, children, isReadingMode = false } = props;
  const fontSize = _fontSize ? _fontSize + 'em' : defaultFontSize;
  const isTransliterationExists = !!children;
  const transliterationClass = isReadingMode ? 'reading-mode-transliteration ' : 'transliteration ';

  if (!isTransliterationExists) return null;

  return (
    <div
      style={{ fontSize }}
      className={transliterationClass + language}>
      {children + ''}
    </div>
  );
}

export default Transliteration;
