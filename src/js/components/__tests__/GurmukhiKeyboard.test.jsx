/* global describe, it, expect, jest */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GurmukhiKeyboard from '../GurmukhiKeyboard';
import { StaticRouter } from 'react-router-dom';

describe('<GurmukhiKeyboard />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <StaticRouter context={{}}>
        <GurmukhiKeyboard active value={'mere'} onKeyClick={jest.fn()} />
      </StaticRouter>
    );

    expect(container).toMatchSnapshot();
  });
  it.skip('triggers onKeyClick', async () => {
    const onKeyClick = jest.fn();

    const { getByText, container } = render(
      <StaticRouter context={{}}>
        <GurmukhiKeyboard active onKeyClick={onKeyClick} value={'mere'} />
      </StaticRouter>
    );

    fireEvent.click(getByText('A'));

    expect(onKeyClick).toHaveBeenCalledWith('mereA');

    fireEvent.click(container.querySelector('[title="Backspace"]'));

    expect(onKeyClick).toHaveBeenCalledWith('mer');
  });
});
