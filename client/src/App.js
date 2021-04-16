import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';

import Header from '../src/components/header';
import Body from '../src/components/body';
import Chatbot from '../src/components/chatbot';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="mainContainer">
          <Body />
          <Chatbot />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    messages: state.messages
  }
}

export default connect(mapStateToProps)(App)