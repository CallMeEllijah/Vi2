import React, { Component } from 'react';
import {connect} from 'react-redux'

class ending extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={this.props.ending}>
                end
            </div>
        );
    }
}

function mapStateToProps(state){
return {
    ending: state.ending,
  };
}


function mapDispatchToProps(dispatch){
    return {
      setProgress: (msgObject) => {
        dispatch({type: "SET_PROGRESS", payload: msgObject})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ending)
