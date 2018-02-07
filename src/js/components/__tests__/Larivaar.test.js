import React from 'react';
import { shallow } from 'enzyme';
import Larivaar from '../Larivaar';

describe('<Larivaar />', () => {
    it('renders children when disabled', () => {
        const wrapper = shallow(
            <Larivaar enable={false}>Vahi Guru</Larivaar>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders concatenated children when enabled', () => {
        const wrapper = shallow(
            <Larivaar>Vahi Guru</Larivaar>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders odd words as orange when larivaarAssist is enabled', () => {
        const wrapper = shallow(
            <Larivaar larivaarAssist={true}>Vahi Guru</Larivaar>
        );

        expect(wrapper).toMatchSnapshot();
    })
});