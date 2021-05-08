import React, { Component } from 'react';
import {connect} from 'react-redux'

class header extends Component {

  render() {
    return (
      <div className='header'>
        <h2>Vi 2 Tutoring Chat Bot</h2>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(header)