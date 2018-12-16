import React from 'react';
import { render } from 'react-testing-library';
import Larivaar from '../Larivaar';

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
