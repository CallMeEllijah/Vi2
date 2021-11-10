import './App.css';
import React, { Component } from 'react';
import {connect} from 'react-redux'

import ProgressBarComponent from '../src/components/progressBar'
import ProblemComponent from '../src/components/problem'
import ChatboxComponent from '../src/components/chatbox'
import InteractablesComponent from '../src/components/interactables'
import NumberSentenceComponent from '../src/components/numberSentence'

class App extends Component {
  render(){
    return (
      <div className="mainContainer">
        <div className="topContainer">
          <ProgressBarComponent />
          <ProblemComponent />
        </div>
        <div className="botContainer">
          <ChatboxComponent />
            <InteractablesComponent />
            <NumberSentenceComponent />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentProgress: state.currentProgress
  };
}


function mapDispatchToProps(dispatch){
  return {
    setProgress: (msgObject) => {
      dispatch({type: "SET_PROGRESS", payload: msgObject})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
