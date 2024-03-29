import rootReducer from './index';
import * as actions from '../actions';
import {categories, category } from '../data/fixtures';

describe('root reducer', () => {

    it('returns the initial state', () => {
        expect(rootReducer({}, {})).toEqual({ categories: [], category: {} })
    }); 

    it('set categories', () => {
        expect(rootReducer({}, {type: actions.SET_CATEGORIES, categories})).toEqual({ categories, category: {}});
    })

    it('pick category', () => {
        expect(rootReducer({}, {type: actions.PICK_CATEGORY, category})).toEqual({ categories: [], category});
    });
})

     