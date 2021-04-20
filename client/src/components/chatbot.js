import React, { Component, useRef, useEffect } from 'react';
import {connect} from 'react-redux'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

class chatbot extends Component {

    constructor(){
        super();
        this.state = {
          name: "",
          message: ""
        }
    }
      
    componentDidMount = () => {
      //???
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
          type: "user",
          message: this.state.message
        }
        this.props.addMessage(message)
        this.setState({message: ""})
    }

    render() {
        return (
        <div className="chatbotContainer">
          <div className="logoHead">
            Like a logo or something like a face or basta...
          </div>
          <div className="chatBot">
            <div className="chatLog">
              {this.props.messages.length === 0 ? "" : this.props.messages.map((msg) => <div className={msg.type}>{msg.message}</div>)}
              <AlwaysScrollToBottom />
            </div>
            <form className="messageSendForm" onSubmit={this.onSubmitMessage}>
              <input type="text" className="messageInput" onChange={this.onChange} value={this.state.message} id="message"/>
              <button className="messageButton">Send</button>
            </form>
          </div>
            
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