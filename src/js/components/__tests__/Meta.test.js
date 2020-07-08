
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { shabad } from './__mocks__/';
import Meta from '../Meta';

//NOTE: MemoryRouter - https://testing-library.com/docs/example-react-router#reducing-boilerplate

describe('<Meta />', () => {
  const translationLanguages = ['english', 'spanish', 'punjabi'];
  const transliterationLanguages = ['english'];

  describe('type=ang', () => {
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

  describe('type=shabad', () => {
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

  describe('type=hukamnama', () => {
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
