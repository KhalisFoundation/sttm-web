import React, { useState, useRef, useEffect } from 'react';

import { diffWords, renderDiffHTML } from './utils/diffWords';

interface DiffInputProps {
  actualText: string;
  editedText: string;
  updateText: (text: string) => void;
}

const DiffInput: React.FC<DiffInputProps> = ({ actualText, editedText, updateText }) => {
  const [text, setText] = useState(editedText);
  const [isEditing, setIsEditing] = useState(false);
  const diffElementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isEditing && diffElementRef.current) {
      const diff = diffWords(actualText, text);
      const html = renderDiffHTML(diff);
      diffElementRef.current.innerHTML = html;
      if (text !== actualText && text !== '') {
        updateText(text);
      }
    }
  }, [text, actualText, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDiffClick = () => {
    setIsEditing(true);
    if (inputRef.current && diffElementRef.current) {
      inputRef.current.style.height = diffElementRef.current?.clientHeight + 'px';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <>
      <textarea
        ref={inputRef}
        value={text}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        className="verse-translation translation-input"
        style={{ display: isEditing ? 'block' : 'none' }}
      />
      <div
        ref={diffElementRef}
        onClick={handleDiffClick}
        style={{ display: isEditing ? 'none' : 'block' }}
        className="verse-translation translation-diff"
      />
    </>
  );
};

export default DiffInput;
