/* global describe, it, expect, jest */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GurmukhiKeyboard from '../GurmukhiKeyboard';
import { MemoryRouter } from 'react-router-dom';

describe('<GurmukhiKeyboard />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <GurmukhiKeyboard active value={'mere'} onKeyClick={jest.fn()} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
  it.skip('triggers onKeyClick', async () => {
    const onKeyClick = jest.fn();

    const { getByText, container } = render(
      <MemoryRouter>
        <GurmukhiKeyboard active onKeyClick={onKeyClick} value={'mere'} />
      </MemoryRouter>
    );

    fireEvent.click(getByText('A'));

    expect(onKeyClick).toHaveBeenCalledWith('mereA');

    fireEvent.click(container.querySelector('[title="Backspace"]'));

    expect(onKeyClick).toHaveBeenCalledWith('mer');
  });
});
