import React, { Component } from 'react';
import {connect} from 'react-redux'

class landing extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready: "notready"
        }
    }

    tutorial = () => {
        this.props.showTutorial("yesTutorial");
    }

    readyUp = () => {
        this.setState({
            ready: "ready"
        })
    }

    exit = () => {
        window.close();
    }

    render() {
        return (
            <div className={this.state.ready}>
                <div className="landingText">Hi, I'm Vi2. I am your peer tutor.</div>
                <div className="topLandingText">I can help you learn more about math!</div>
                <div className="logo"></div>
                <div className="bottomLandingText">Are you ready to start?</div>
                <div className="landingVerticalContainer">
                    <button className="landingButton b1" onClick={this.tutorial}>NO, SHOW ME THE TUTORIAL</button>
                    <button className="landingButton b3" onClick={this.readyUp}>READY</button>
                    <button className="landingButton b2" onClick={this.exit}>NO, I WANT TO EXIT</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        tutorialShow: state.tutorialShow
    };
}
    
    
function mapDispatchToProps(dispatch){
    return {
        showTutorial: (msgObject) => {
            dispatch({type: "SET_TUTORIALSHOW", payload: msgObject})
        }
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(landing)
