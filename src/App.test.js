import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { categories } from './data/fixtures'


configure({adapter: new Adapter()});

const props = { categories };

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('App', () => {
  const app = shallow(<App {...props}/>)

  it('renders the title', ()=>{
    expect(app.find('h1').text()).toEqual('Jeopardy!')
  })

  it('creates the correct number of links', ()=>{
    expect(app.find('Link').length).toEqual(categories.length)
  })

  it('title the links correctly', ()=> {
    app.find('Link h4').forEach((linkTitle, index) =>{
      expect(linkTitle.text()).toEqual(categories[index].title)
    })
  })
})
