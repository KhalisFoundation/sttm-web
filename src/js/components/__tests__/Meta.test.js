
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {
  render,
  screen,
} from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom/matchers'

import { shabad, mockStore } from '../__mocks__/';
import Meta from '../Meta';
expect.extend({ toHaveClass });

jest.mock('react-date-picker', () => () => <div>react calendar</div>)

//NOTE: MemoryRouter - https://testing-library.com/docs/example-react-router#reducing-boilerplate

describe('<Meta />', () => {
  const translationLanguages = ['english', 'spanish', 'punjabi'];
  const transliterationLanguages = ['english'];
  const store = mockStore({ darkMode: false, autoScrollMode: false, showShabadAudioPlayer: true });

  describe('<Meta type=\"ang\" />', () => {
    let renderedComponent = null;

    beforeEach(() => {
      renderedComponent = render(
        <Provider store={store}>
          <Meta
            type="ang"
            isUnicode={false}
            info={shabad.shabadInfo}
            translationLanguages={translationLanguages}
            transliterationLanguages={transliterationLanguages} />
        </Provider >,
        { wrapper: MemoryRouter }
      );
    });

    it('renders correctly', () => {
      const { container } = renderedComponent;
      expect(container).toMatchSnapshot();
    })

    // it('shows navigation arrows properly on fullscreen mode', async () => {
    //   const { container } = renderedComponent;
    //   const fullscreen = container.querySelector('.fullscreen');
    //   await fireEvent.click(fullscreen);

    //   // Basic limitation with css style as we can't test style changes on nav items
    //   const body = document.querySelector('body');
    //   expect(body).toHaveClass('fullscreen-view');
    // });
  });

  describe('<Meta type=\"shabad\" />', () => {
    let renderedComponent = null;
    const store = mockStore({ showShabadAudioPlayer: true });

    beforeEach(() => {
      renderedComponent = render(
        <Provider store={store}>
          <Meta
            type="shabad"
            isUnicode={false}
            info={shabad.shabadInfo}
            translationLanguages={translationLanguages}
            transliterationLanguages={transliterationLanguages} />
        </Provider>,
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
        <Provider store={store}>
          <Meta
            type="hukamnama"
            isUnicode={false}
            info={shabad.shabadInfo}
            translationLanguages={translationLanguages}
            transliterationLanguages={transliterationLanguages} />
        </Provider >,
        { wrapper: MemoryRouter }
      );
    })
    it('renders correctly', () => {
      const { container } = renderedComponent;
      expect(container).toMatchSnapshot();
    })
  });
});
