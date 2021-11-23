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
                <button className="landingButton" onClick={this.readyUp}>ready na ko kausapin si vi2</button>
            </div>
        );
    }
}

export default landing;
