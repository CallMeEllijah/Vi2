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
        <button onClick={this.checkProps}>BODY Check props</button>
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