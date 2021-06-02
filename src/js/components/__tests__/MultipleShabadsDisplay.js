/* global describe, it, expect, jest */
import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import { shabad, mockStore } from '../__mocks__/';
import { setMultipleShabads } from '@/features/actions';

import MultipleShabadsDisplay from "../MultipleShabadsDisplay";

describe('Multiple Shabads Display', () => {
  let store;
  let renderedComponent;
  const mockShabad = {
    id: shabad.verses[0].verseId,
    shabadId: shabad.verses[0].shabadId,
    verse: shabad.verses[0].verse.unicode
  }

  beforeEach(() => {
    store = mockStore({
      multipleShabads: [],
      showMultiViewPanel: true
    });

    store.dispatch = jest.fn();

    global.scrollTo = jest.fn()

    renderedComponent = render(
      <Provider store={store}>
        <MultipleShabadsDisplay />
      </Provider>
    );
  });

  it('should render successfully', () => {
  });
  /*
  it('should be visible with given state from Redux store', () => {
    expect(screen.getByTestId('multi-view')).toBeVisible();
  });

  it('should be render shabads after redux dispatch', () => {
    store.dispatch(setMultipleShabads(mockShabad))
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
    */
})