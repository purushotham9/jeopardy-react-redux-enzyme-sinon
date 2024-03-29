import React, { Component } from 'react';
import './App.css';

import { setCategories, pickCategory } from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



export class App extends Component {

  componentDidMount() {
    if (this.props.categories.length === 0) {
      fetch('http://jservice.io/api/categories?count=20')
        .then(response => response.json())
        .then(json => this.props.setCategories(json))
    }
  }
  render() {

    console.log('app props', this.props)
    return (
      <div className="App">
        <h1>Jeopardy!</h1>

        {
          this.props.categories.map(category =>{
            return(
            <div key={category.id}>
              <Link to="/category" onClick={() => this.props.pickCategory(category)}>
              <h4>{category.title}</h4>
              </Link>
            </div>)
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories }
}


export default connect(mapStateToProps, { setCategories, pickCategory })(App)
