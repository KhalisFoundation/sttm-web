
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import {
  toBeVisible
} from '@testing-library/jest-dom/matchers'

expect.extend({ toBeVisible })

import { shabad, mockStore } from '../__mocks__/';
import FullScreen from '../FloatingActions/FullScreen';
import Meta from '../Meta';

//NOTE: MemoryRouter - https://testing-library.com/docs/example-react-router#reducing-boilerplate

describe('<Meta />', () => {
  const translationLanguages = ['english', 'spanish', 'punjabi'];
  const transliterationLanguages = ['english'];

  it('shows properly on fullscreen mode', async () => {
    const store = mockStore({ darkMode: false, autoScrollMode: false });
    const { container } = render(
      <Provider store={store}>
        <div>
          <FullScreen />
          <Meta
            type="ang"
            isUnicode={false}
            info={shabad.shabadInfo}
            translationLanguages={translationLanguages}
            transliterationLanguages={transliterationLanguages} />
        </div>
      </Provider >,
      { wrapper: MemoryRouter }
    );
    const fullscreen = container.querySelector('.fullscreen');
    const navElems = container.querySelectorAll('.shabad-nav');
    const navElemLeft = navElems[0];
    const navElemRight = navElems[1];

    await fireEvent.click(fullscreen);

    expect(navElemLeft).toBeVisible();
    expect(navElemRight).toBeVisible();
  });

  describe('<Meta type=\"ang\" />', () => {
    it('renders correctly', () => {
      const { container } = render(
        <Meta
          type="ang"
          isUnicode={false}
          info={shabad.shabadInfo}
          translationLanguages={translationLanguages}
          transliterationLanguages={transliterationLanguages} />,
        { wrapper: MemoryRouter }
      );
      expect(container).toMatchSnapshot();
    })
  });

  describe('<Meta type=\"shabad\" />', () => {
    let renderedComponent = null;
    beforeEach(() => {
      renderedComponent = render(
        <Meta
          type="shabad"
          isUnicode={false}
          info={shabad.shabadInfo}
          translationLanguages={translationLanguages}
          transliterationLanguages={transliterationLanguages} />,
        { wrapper: MemoryRouter }
      );
    })

    it('renders correctly', () => {
      const { container } = renderedComponent;
      expect(container).toMatchSnapshot();
    })

    it('shows chevron navigation buttons', () => {
      const { queryAllByTestId } = renderedComponent;
      expect(queryAllByTestId('chevron')).toHaveLength(2);
    });
  });

  describe('<Meta type=\"hukamnama\" />', () => {
    let renderedComponent = null;
    beforeEach(() => {
      renderedComponent = render(
        <Meta
          type="hukamnama"
          isUnicode={false}
          info={shabad.shabadInfo}
          translationLanguages={translationLanguages}
          transliterationLanguages={transliterationLanguages} />,
        { wrapper: MemoryRouter }
      );

    })
    it('renders correctly', () => {
      const { container } = renderedComponent;
      expect(container).toMatchSnapshot();
    })

    it('shows hours navigation buttons', () => {
      const { queryAllByTestId } = renderedComponent;
      expect(queryAllByTestId('hour24')).toHaveLength(2);
    });
  });
});
