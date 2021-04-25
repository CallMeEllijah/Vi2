import React, { Component } from 'react';
import {connect} from 'react-redux'

class body extends Component {

  checkProps = e => {
    e.preventDefault();

    console.log(this.props)
  }

  render() {
    return (
      <div className="bodyContainer">
        <div className="infoContainer problem">problem</div>
        <div className="infoContainer equation">equation</div>
        <div className="infoContainer dragabols">dragabols</div>
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

export default connect(mapStateToProps)(body)