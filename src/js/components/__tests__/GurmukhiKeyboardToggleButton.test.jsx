/* global describe, it, expect, jest */
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import GurmukhiKeyboardToggleButton from '../GurmukhiKeyboardToggleButton';
import { StaticRouter } from 'react-router-dom';

describe('<GurmukhiKeyboardToggleButton />', () => {
  const clickFn = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should have active class isVisible is true', () => {
    const { container } = render(
      <StaticRouter context={{}}>
        <GurmukhiKeyboardToggleButton
          clickHandler={clickFn}
          isVisible
        />
      </StaticRouter>
    );

    expect(container.querySelector('.gurmukhi-keyboard-toggle.active')).toBeInTheDocument();
  });

  it('shouldn\'t have active class isVisible is false', () => {
    const { container } = render(
      <StaticRouter context={{}}>
        <GurmukhiKeyboardToggleButton
          clickHandler={clickFn}
        />
      </StaticRouter>
    );

    expect(container.querySelector('.gurmukhi-keyboard-toggle.active')).not.toBeInTheDocument();
  });

  it('should trigger click handler', () => {
    const { container } = render(
      <StaticRouter context={{}}>
        <GurmukhiKeyboardToggleButton
          clickHandler={clickFn}
          isVisible
        />
      </StaticRouter>
    );

    const element = container.querySelector('.gurmukhi-keyboard-toggle');

    userEvent.click(element);

    expect(clickFn).toHaveBeenCalledTimes(1);
  });
});
