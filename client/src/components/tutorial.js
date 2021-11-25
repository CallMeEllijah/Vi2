import React, { Component } from 'react';
import {connect} from 'react-redux'

class tutorial extends Component {

    constructor(props){
        super(props);
        this.state = { //will execute once upon inheriting react component
            tutorialPic: "tutorialPic1",
            pageNum: "1 of 6"
        }
    }

    nextSlide = () => {
        switch (this.state.tutorialPic){
            case "tutorialPic1":
                this.setState({
                    tutorialPic: "tutorialPic2",
                    pageNum: "2 of 6"
                })
                break;
            case "tutorialPic2":
                this.setState({
                    tutorialPic: "tutorialPic3",
                    pageNum: "3 of 6"
                })
                break;
            case "tutorialPic3":
                this.setState({
                    tutorialPic: "tutorialPic4",
                    pageNum: "4 of 6"
                })
                break;
            case "tutorialPic4":
                this.setState({
                    tutorialPic: "tutorialPic5",
                    pageNum: "5 of 6"
                })
                break;
            case "tutorialPic5":
                this.setState({
                    tutorialPic: "tutorialPic6",
                    pageNum: "6 of 6"
                })
                break;
        }
    }

    prevSlide = () => {
        switch (this.state.tutorialPic){
            case "tutorialPic2":
                this.setState({
                    tutorialPic: "tutorialPic1",
                    pageNum: "1 of 6"
                })
                break;
            case "tutorialPic3":
                this.setState({
                    tutorialPic: "tutorialPic2",
                    pageNum: "2 of 6"
                })
                break;
            case "tutorialPic4":
                this.setState({
                    tutorialPic: "tutorialPic3",
                    pageNum: "3 of 6"
                })
                break;
            case "tutorialPic5":
                this.setState({
                    tutorialPic: "tutorialPic4",
                    pageNum: "4 of 6"
                })
                break;
            case "tutorialPic6":
                this.setState({
                    tutorialPic: "tutorialPic5",
                    pageNum: "5 of 6"
                })
                break;
        }
    }

    exitTutorial = () => {
        this.props.showTutorial("noTutorial");
    }

    render() {
        return (
            <div className={this.props.tutorialShow}>
                <div className="tutorialText">Tutorial!</div>
                <div className="tutorialText">{this.state.pageNum}</div>
                <div className={this.state.tutorialPic} /> 
                <div className="tutorialVerticalContainer">
                    <button className="landingButton b2" onClick={this.exitTutorial}>EXIT</button>
                    <div>
                        <button className="landingButton b1" onClick={this.prevSlide}>BACK</button>
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