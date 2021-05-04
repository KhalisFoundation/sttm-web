/* global describe, it, expect, jest */ 
import React from 'react';
import { Provider } from 'react-redux';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { mockStore } from '../__mocks__/';
//import { clearMultipleShabads, removeMultipleShabads, setMultiViewPanel, setMultipleShabads } from '@/features/actions';

import MultipleShabadsDisplay from "../MultipleShabadsDisplay";

describe('Multiple Shabads Display', () => {
  let store;
  let renderedComponent;
 
  beforeEach(() => {
    store = mockStore({
      multipleShabads: [],
      showMultiViewPanel: true
    });

    store.dispatch = jest.fn();

    renderedComponent = render(
      <Provider store={store}>
        <MultipleShabadsDisplay />
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    const { container } = renderedComponent;
    expect(container).toMatchSnapshot();
  });
  
  it('should render with given state from Redux store', () => {
    expect(screen.getByRole('complementary')).toBeVisible();
  });
})