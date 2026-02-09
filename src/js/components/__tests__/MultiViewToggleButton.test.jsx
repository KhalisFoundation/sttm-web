/* global describe, it, expect */
import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, act } from '@testing-library/react';
import { mockStore } from '../__mocks__';

import MultiViewButton from '../MultiViewButton'
import { setMultiViewPanel } from "@/features/actions";

describe('<MultiViewToggleButton />', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      showMultiViewPanel: false,
    });

    store.dispatch = jest.fn();
  });

  it('should dispatch an action on button click', () => {
    const { container } = render(
      <Provider store={store}>
        <MultiViewButton />
      </Provider>
    );

    const button = container.querySelector('button');

    act(() => {
      fireEvent.click(button);
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      setMultiViewPanel(true)
    );
  });
})