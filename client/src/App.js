import './App.css';
import React, { Component } from 'react';
import {connect} from 'react-redux'
import Confetti from "react-confetti";

import ProgressBarComponent from '../src/components/progressBar'
import ProblemComponent from '../src/components/problem'
import ChatboxComponent from '../src/components/chatbox'
import InteractablesComponent from '../src/components/interactables'
import NumberSentenceComponent from '../src/components/numberSentence'
import Landing from '../src/components/landing'
import Tutorial from '../src/components/tutorial'
import Ending from '../src/components/ending'

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <div style={{height: "100%", width: "100%", }}>
      <Tutorial />
      <Landing />
      <Ending />
      <div className="mainContainer">
        <Confetti
          run={this.props.confettiShow}
          recycle={this.props.confettiRecycle}
          numberOfPieces={100}
          gravity={0.5}
        />
        <div className="topContainer">
          <ProgressBarComponent />
          <ProblemComponent />
        </div>
        <div className="botContainer">
          <ChatboxComponent />
          <div className="secondaryBotContainer">
            <InteractablesComponent />
            <NumberSentenceComponent />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    confettiShow: state.confettiShow,
    confettiRecycle: state.confettiRecycle
  };
}


function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
