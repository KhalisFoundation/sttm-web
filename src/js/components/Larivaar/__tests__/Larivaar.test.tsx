import React from 'react';
import { Provider } from 'react-redux'
import { mockStore } from '../../__mocks__';

import { render } from '@testing-library/react';
import { Larivaar } from '..';

const store = mockStore({ darkMode: false });

describe('<Larivaar />', () => {
  it('renders correctly', () => {

  })
  // it('renders children when disabled', () => {
  //   const { container } = render(
  //     <Provider store={store}>
  //       <Larivaar enable={false}>Vahi Guru</Larivaar>
  //     </Provider>
  //   );

  //   expect(container).toMatchSnapshot();
  // });

  // it('renders concatenated children when enabled', () => {
  //   const { container } = render(
  //     <Provider store={store}>
  //       <Larivaar>Vahi Guru</Larivaar>
  //     </Provider>
  //   );

  //   expect(container).toMatchSnapshot();
  // });

  // it('renders odd words as orange when larivaarAssist is enabled', () => {
  //   const container = render(
  //     <Provider store={store}>
  //       <Larivaar larivaarAssist={true}>Vahi Guru</Larivaar>
  //     </Provider>
  //   );

  //   expect(container).toMatchSnapshot();
  // });
});
