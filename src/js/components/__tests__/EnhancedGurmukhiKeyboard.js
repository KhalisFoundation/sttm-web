/* global describe, it, expect, jest */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { SEARCH_TYPES } from '@/constants'
import { EnhancedGurmukhiKeyboard } from '../EnhancedGurmukhiKeyboard';
import { StaticRouter } from 'react-router-dom';

describe('<EnhancedGurmukhiKeyboard />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <StaticRouter context={{}}>
        <EnhancedGurmukhiKeyboard
          value={'mere'}
          searchType={parseInt(SEARCH_TYPES.FIRST_LETTERS)}
          active
          onKeyClick={jest.fn()}
          onClose={jest.fn()}
          onKeyClick={jest.fn()}
        />
      </StaticRouter>
    );
    expect(container.querySelector('.gurmukhi-keyboard.active')).toBeInTheDocument();
  });

  it('shouldn\'t render when active prop is false', () => {
    const { container } = render(
      <StaticRouter context={{}}>
        <EnhancedGurmukhiKeyboard
          value={'mere'}
          searchType={parseInt(SEARCH_TYPES.FIRST_LETTERS)}
          active={false}
          onKeyClick={jest.fn()}
          onClose={jest.fn()}
          onKeyClick={jest.fn()}
        />
      </StaticRouter>
    );
    expect(container.querySelector('.gurmukhi-keyboard.active')).not.toBeInTheDocument();
  });
});
