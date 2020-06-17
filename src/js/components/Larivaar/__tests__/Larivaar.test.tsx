import React from 'react';
import { render } from '@testing-library/react';
import Larivaar from '..';

describe('<Larivaar />', () => {
  it('renders children when disabled', () => {
    const { container } = render(<Larivaar enable={false}>Vahi Guru</Larivaar>);

    expect(container).toMatchSnapshot();
  });

  it('renders concatenated children when enabled', () => {
    const { container } = render(<Larivaar>Vahi Guru</Larivaar>);

    expect(container).toMatchSnapshot();
  });

  it('renders odd words as orange when larivaarAssist is enabled', () => {
    const container = render(
      <Larivaar larivaarAssist={true}>Vahi Guru</Larivaar>
    );

    expect(container).toMatchSnapshot();
  });
});
