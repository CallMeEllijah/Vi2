import Axios from 'axios';
import React, { Component, useRef, useEffect } from 'react';
import {connect} from 'react-redux'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => {
    elementRef.current.scrollIntoView()
  });
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
    
    componentDidMount = async() => {
      try {
        const response = await Axios.post('http://localhost:5000/api/dialogflow/eventQuery',{"event":"IntroduceVi2"})
        const content = response.data.fulfillmentMessages[0]
        console.log(content.text.text[0])
        const message2 = {
          type: "bot",
          message: content.text.text[0]
        }
        
        this.props.addMessage(message2)
      } catch (error) {
        
      }
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

    onSubmitMessage = async e => {
        e.preventDefault();
    
        const message = {
          type: "user",
          message: this.state.message
        }
        this.props.addMessage(message)
        var input = this.state.message
        
        const textQueryVariable = {
          "text":input
        }

        console.log(input)
        try {
          const response = await Axios.post('http://localhost:5000/api/dialogflow/textQuery',textQueryVariable)
          const content = response.data.fulfillmentMessages[0]
          console.log()
          const message2 = {
            type: "bot",
            message: content.text.text[0]
          }
          this.props.addMessage(message2)
        } catch (error) {
          
        }
        

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
    messages: state.messages,
    draggables: state.draggables
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