import Axios from 'axios';
import React, { Component } from 'react';
import {connect} from 'react-redux'
const { v4: uuidv4 } = require('uuid');

class header extends Component {

  constructor(){
    super();
    var id = uuidv4()
    console.log(id)
    Axios.post("/setSessionID", {seshID: id}).then(res => {
      console.log("hakdog");
    })
  }

  render() {
    return (
      <div className='header'>
        <h2>Vi2 Tutoring Chat Bot</h2>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    mistakesU: state.mistakesU,
    mistakesF: state.mistakesF,
    mistakesC: state.mistakesC,
    questiontype: state.questiontype
  }
}

function mapDispatchToProps(dispatch){
  return {
    setMistakeU: (msgObject) => {
      dispatch({type: "SET_MISTAKEU", payload: msgObject})
    },
    setMistakeF: (msgObject) => {
      dispatch({type: "SET_MISTAKEF", payload: msgObject})
    },
    setMistakeC: (msgObject) => {
      dispatch({type: "SET_MISTAKEC", payload: msgObject})
    },
    setQuestionType: (msgObject) => {
      dispatch({type: "SET_QUESTION_TYPE", payload: msgObject})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(header)
