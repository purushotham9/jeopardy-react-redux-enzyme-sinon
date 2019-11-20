import React from 'react';
import { Category, LinkedCategory } from './Category';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { categories, clues } from '../data/fixtures';
import { fakeServer } from 'sinon';

configure({ adapter: new Adapter() });

const props = { category: categories[0] };

describe('Category', () => {

    let server;
    beforeEach(() => {
        server = fakeServer.create();
        server.respondWith(
            'GET',
            `http://jservice.io./api/clues?category=${props.category.id}`,
            [
                200,
                { 'Content-Type': 'application/json' },
                JSON.stringify(clues)
            ]
        )
    });
    describe('when creating a new category', () => {
        let category;

        beforeEach(done => {
            category = mount(<Category {...props} />);

            server.respond();
            setTimeout(done)
            //     () => {
            //     category.update();
            //     console.log("%c server.requests", "color: #C78B41", server.requests);
            //     done();
            // });

        });
        it('logs', () => {
            console.log(category.debug())
        })

        // it('initializes the clues in state', () => {
        //     expect(category.state().clues).toEqual(clues)
        // });
        it('renders the category title', () => {
            expect(category.find('h1').text()).toEqual(props.category.title)
        });

        it('renders the correct number of clues', () => {
            expect(category.find('Clue').length).toEqual(clues.length - 2);
        });

    });
});

describe('LinkedCategory', () => {
    const linkedCategory = shallow(<LinkedCategory />);
    it('creates the link to navigate home', () => {
        expect(linkedCategory.find('Link h4').text()).toEqual('Home')
    })

    it('creates a category component', () => {
        expect(linkedCategory.find('Category').exists()).toBe(true);
    })
});