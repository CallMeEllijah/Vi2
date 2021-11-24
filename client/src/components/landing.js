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
                <div className="landingText">Press Ready to start chatting with Vi2</div>
                <div className="logo"></div>
                <button className="landingButton" onClick={this.readyUp}>READY</button>
            </div>
        );
    }
}

export default landing;
