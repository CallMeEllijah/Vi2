import React, { Component } from 'react';

class landing extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready: "notready"
        }
    }

    readyUp = () => {
        this.setState({
            ready: "ready"
        })
    }

    render() {
        return (
            <div className={this.state.ready}>
                <div className="landingText"><center>Are you ready to start? </center></div>
                <div className="logo"></div>
                <button className="noShowMeFirst" onClick={this.readyUp}>No, show me first how</button>
                <button className="landingButton" onClick={this.readyUp}>Yes, I am ready</button>
                <button className="nExit" onClick={this.readyUp}>No, I want to exit</button>
                
            </div>
        );
    }
}

export default landing;
