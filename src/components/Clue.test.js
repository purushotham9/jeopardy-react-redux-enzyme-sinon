import React from 'react';
import ReactDOM from 'react-dom';
import Clue from './Clue';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { clue } from '../data/fixtures';

configure({ adapter: new Adapter() });

const props = { clue };


describe('Clue', () => {
    let clueWrapper = shallow(<Clue {...props} />)

    it('renders the value', () => {
        expect(clueWrapper.find('h4').text()).toEqual(clue.value.toString())
    });

    it('renders the question', () => {
        expect(clueWrapper.find('h5').at(0).text()).toEqual(clue.question)
    });
    it('renders the answer', () => {
        expect(clueWrapper.find('h5').at(1).text()).toEqual(clue.answer)
    });
    it('sets the answer with the `text-hidden` class', () => {
        expect(clueWrapper.find('h5').at(1).hasClass('text-hidden')).toBe(true)
    });

    it('initializes the `reveal` state to be `false`', () => {
        expect(clueWrapper.state().reveal).toBe(false) 
    });

    describe('when rendering a clue no value', () => {
        beforeEach(() => {
            props.clue.value = undefined;
            
            clueWrapper = shallow(<Clue {...props} />)
        });

        it('displays the value as `unknown` ', () => {
            expect(clueWrapper.find('h4').text()).toEqual('unknown')
        });

    });

    describe('when clicking on the clue', () => {
        beforeEach(() => clueWrapper.simulate('click'));

        it('sets the `reveal` state to be `true` ', () => {
            expect(clueWrapper.state().reveal).toBe(true) 
        });

        it('sets the answer with the `text-revealed` class ', () => {
            expect(clueWrapper.find('h5').at(1).hasClass('text-revealed')).toBe(true)
        });

    });


});