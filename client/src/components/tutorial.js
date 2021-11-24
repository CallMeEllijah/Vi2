import React, { Component } from 'react';
import {connect} from 'react-redux'

class tutorial extends Component {

    constructor(props){
        super(props);
    }

    nextSlide = () => {
    }

    exitTutorial = () => {
        this.props.showTutorial("noTutorial");
    }

    render() {
        return (
            <div className={this.props.tutorialShow}>
                <div className="tutorialText">Tutorial!</div>
                <div className="tutorialPic" />
                <div className="tutorialVerticalContainer">
                    <button className="landingButton b2" onClick={this.exitTutorial}>EXIT</button>
                    <div>
                        <button className="landingButton b1" onClick={this.nextSlide}>BACK</button>
                        <button className="landingButton b3" onClick={this.nextSlide}>NEXT</button>
                    </div>
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
    
export default connect(mapStateToProps, mapDispatchToProps)(tutorial)