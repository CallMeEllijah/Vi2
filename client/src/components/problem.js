import React, { Component } from 'react';
import {connect} from 'react-redux'

class problem extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidUpdate(prevState, prevProps){
        if(prevState.currentProgress !== this.props.currentProgress){
        }
    }

    render() {
        return (
            <div className="problemTextContainer">
                <h2 className="problemText">{this.props.problem}</h2>
            </div>
        );
    }
}

function mapStateToProps(state){
return {
    currentProgress: state.currentProgress,
    messages: state.messages,
    sessionID: state.sessionID,
    problem : state.problem,

    currentUser: state.currentUser,
    userName : state.userName,
  };
}


function mapDispatchToProps(dispatch){
    return {
      setProgress: (msgObject) => {
        dispatch({type: "SET_PROGRESS", payload: msgObject})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(problem)
