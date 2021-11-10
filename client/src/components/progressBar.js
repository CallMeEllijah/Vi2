import React, { Component } from 'react';
import {connect} from 'react-redux'

class progressBar extends Component {

    constructor(){
        super();
        this.state = {
            circle1: "uncheckedCircle",
            circle2: "uncheckedCircle",
            circle3: "uncheckedCircle",
            circle4: "uncheckedCircle",
            circle5: "uncheckedCircle",
            circle6: "uncheckedCircle"
        }
    }

    componentDidUpdate(prevState, prevProps){
        if(prevState.currentProgress !== this.props.currentProgress){   
            if(this.props.currentProgress === 0) {
                this.setState({circle1: "progressCircle"})
            } else if(this.props.currentProgress === 1) {
                this.setState({circle1: "checkedCircle"})
                this.setState({circle2: "progressCircle"})
            } else if(this.props.currentProgress === 2) {
                this.setState({circle2: "checkedCircle"})
                this.setState({circle3: "progressCircle"})
            } else if(this.props.currentProgress === 3) {
                this.setState({circle3: "checkedCircle"})
                this.setState({circle4: "progressCircle"})
            } else if(this.props.currentProgress === 4) {
                this.setState({circle4: "checkedCircle"})
                this.setState({circle5: "progressCircle"})
            } else if(this.props.currentProgress === 5) {
                this.setState({circle5: "checkedCircle"})
                this.setState({circle6: "progressCircle"})
            } else if(this.props.currentProgress === 6) {
                this.setState({circle6: "checkedCircle"})
            } 
        }
    }

    render() {
        return (
            <div className="progressBarContainer">
                <h3> START </h3>
                <div className={"circleBase " + this.state.circle1}></div>
                <div className={"circleBase " + this.state.circle2}></div>
                <div className={"circleBase " + this.state.circle3}></div>
                <div className={"circleBase " + this.state.circle4}></div>
                <div className={"circleBase " + this.state.circle5}></div>
                <div className={"circleBase " + this.state.circle6}></div>
                <h3> END </h3>
            </div>
        );
    }
}

function mapStateToProps(state){
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

export default connect(mapStateToProps, mapDispatchToProps)(progressBar)
