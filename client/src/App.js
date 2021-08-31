import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';

import Header from '../src/components/header';
import Body from '../src/components/body';
import Chatbot from '../src/components/chatbot';

const { v4: uuidv4 } = require('uuid');
var id = uuidv4()

class App extends Component {

  componentDidMount(){
    //console.log(id); uuidv4 generation check
    this.props.setSession(id);
  }

  render() {
    //console.log(this.props); session ID check
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
    sessionID: state.sessionID
  }
}

function mapDispatchToProps(dispatch){
    return {
      setSession: (userObject) => {
        dispatch({type: "SET_SESSION", payload: userObject})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)