import React, { Component } from 'react';
import {connect} from 'react-redux'

class chatbot extends Component {

    constructor(){
        super();
        this.state = {
          name: "",
          messages: {},
          message: ""
        }
      }
    
    componentDidMount = () => {
    }
    
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    
    onSubmit = e => {
        e.preventDefault();
    
        const user = {
          name: this.state.name
        }
        this.props.setUser(user)
    }

    onSubmitMessage = e => {
        e.preventDefault();
    
        const message = {
          message: this.state.message
        }
        this.props.addMessage(message)
    }
    
    checkProps = e => {
        e.preventDefault();
    
        console.log(this.props)
    }

    render() {
        return (
        <div className="chatbotContainer">   
            <form onSubmit={this.onSubmit}>
            <input onChange={this.onChange} value={this.state.name} id="name"></input>
            <button>submit name</button>
            </form>
            <form onSubmit={this.onSubmitMessage}>
            <input onChange={this.onChange} value={this.state.message} id="message"></input>
            <button>submit message</button>
            </form>
            <button onClick={this.checkProps}>Check props</button>
            <pre>
                {JSON.stringify(this.props.messages)}
            </pre>
        </div>
        );
    }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    messages: state.messages
  }
}

function mapDispatchToProps(dispatch){
    return {
      setUser: (userObject) => {
        dispatch({type: "SET_USER", payload: userObject})
      },
      addMessage: (msgObject) => {
        dispatch({type: "ADD_MESSAGE", payload: msgObject})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(chatbot)