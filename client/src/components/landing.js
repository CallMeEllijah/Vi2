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
                
                <button className="landingButton" onClick={this.readyUp}>READY</button>
            </div>
        );
    }
}

export default landing;
