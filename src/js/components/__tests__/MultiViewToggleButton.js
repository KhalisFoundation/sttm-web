/* global describe, it, expect */
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mockStore } from '../__mocks__/';

import MultiViewButton from '../MultiViewButton'
import { setMultiViewPanel } from "@/features/actions";

describe('<MultiViewToggleButton />', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      showMultiViewPanel: false,
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <MultiViewButton />
      </Provider>
    );
  });

  it('should dispatch an action on button click', () => {
    const event = { preventDefault: () => { } };
    jest.spyOn(event, 'preventDefault');

    renderer.act(() => {
      component.root.findByType('button').props.onClick(event);
    })

    expect(event.preventDefault).toBeCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      setMultiViewPanel(true)
    );
  });
})