import React, { Component } from 'react';
import {connect} from 'react-redux'
import Confetti from "react-confetti";

class ending extends Component {

    constructor(props){
        super(props);
        this.state = {
            height: window.height,
            width: window.width
        }
    }

    render() {
        return (
            <div className={this.props.ending}>
                <div className="landingText">
                    Congratulations! You have finished all the problems!
                </div>
                <div className="logo"></div>
                 <Confetti
                    width={this.state.width}
                    height={this.state.height}
                    run={this.props.endingConfetti}
                    recycle={true}
                    numberOfPieces={1000}
                    gravity={0.05}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
return {
    ending: state.ending,
    endingConfetti: state.endingConfetti
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
