import Axios from 'axios';
import React, { Component, useRef, useEffect } from 'react';
import {connect} from 'react-redux'

//initialize the unique id used for the chatting with the chatbot
const { v4: uuidv4 } = require('uuid');
var id = uuidv4()

//Auto scroll to bottom for chatlogs
const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => {
      elementRef.current.scrollIntoView()
    });
    return <div ref={elementRef} />;
  };

class chatbox extends Component {

    constructor(){
        super();
        this.state = {
            name: "",
            message: ""
          }
    }

    //initialization and start of vi to chat
    componentDidMount = async() => {
        try{
          await this.props.setSession(id);
        }catch(err){}
  
        try {
          console.log(this.props)
          const response = await Axios.post('/api/dialogflow/eventQuery',{"queryEvent":"IntroduceVi2", "sessionId":this.props.sessionID})
          const content = response.data.response
          const message2 = {
            key: this.props.messages.length,
            type: "botMessageContainer",
            message: content.fulfillmentText
          }
          this.props.addMessage(message2)
        } catch (error) {
          console.log(error);
        }
      }

    //data manipulation for input boxes
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    //Function that will process the users messages
    onSubmitMessage = async e => {
        e.preventDefault();
        const message = {
          key: this.props.messages.length,
          type: "userMessageContainer",
          message: this.state.message
        }
        this.props.addMessage(message)
        var input = this.state.message
        
        const textQueryVariable = {
          "queryText":input,
          "sessionId":this.props.sessionID
        }
        
        try {
          const response = await Axios.post('/api/dialogflow/textQuery',textQueryVariable)
          const content = response.data.response.fulfillmentText
          const intent = response.data.response.intent.displayName
          console.log(content)
          console.log(intent)
          
          const message2 = {
            key: this.props.messages.length,
            type: "botMessageContainer",
            message: content
          }
          if (intent === "Not Ready To Proceed Question"|| intent === "Break From Question" || intent === "Break From Problem" || intent === "Not Ready To Proceed Problem" || intent === "Explain Problem"){
            this.props.addMessage(message2)
          }
          else if (intent === "Default Fallback Intent"){
            this.props.addMessage(message2)
          }
          else if(intent === "Get Student Name" || intent === "Get Student Name All"){
            this.props.addMessage(message2)
            console.log(response)
            this.props.setName(response.data.response.outputContexts[0].parameters.fields.name.stringValue)
            Axios.post("/addUser", {name: this.props.userName}).then(res => {
              console.log("kek")
              this.props.setUser(res.data._id);
            })
          }
          else if(intent === "Show Problem"){
            this.props.setProblem(response.data.response.outputContexts[0].parameters.fields.problem.stringValue)
            this.props.addMessage(message2)
            if(typeof response.data.response.outputContexts[0].parameters.fields.requestion !== "undefined"){
              const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"RE", "sessionId":this.props.sessionID})
              const content1 = response1.data.response.fulfillmentText
              const message3 = {
                key: this.props.messages.length,
                type: "botMessageContainer",
                message: content1
              }
              this.props.addMessage(message3)
              if(typeof response.data.response.outputContexts[0].parameters.fields.requestion !== "undefined"){
                const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"RE", "sessionId":this.props.sessionID})
                const content1 = response1.data.response.fulfillmentText
                const message3 = {
                  key: this.props.messages.length,
                  type: "botMessageContainer",
                  message: content1
                }
                this.props.addMessage(message3)
              }
              else if(typeof response.data.response.outputContexts[0].parameters.fields.summary !== "undefined"){
                const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"summary", "sessionId":this.props.sessionID})
                const content1 = response1.data.response.fulfillmentText
                const message3 = {
                  key: this.props.messages.length,
                  type: "botMessageContainer",
                  message: content1
                }
                this.props.addMessage(message3)
              }
            }
            else if(typeof response.data.response.outputContexts[0].parameters.fields.summary !== "undefined"){
              const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"summary", "sessionId":this.props.sessionID})
              const content1 = response1.data.response.fulfillmentText
              const message3 = {
                key: this.props.messages.length,
                type: "botMessageContainer",
                message: content1
              }
              this.props.addMessage(message3)
            }
          }
          else if(intent === "Check Question Answer"){
            this.props.addMessage(message2)
            if(typeof response.data.response.outputContexts[0].parameters.fields.requestion !== "undefined"){
              const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"RE", "sessionId":this.props.sessionID})
              const content1 = response1.data.response.fulfillmentText
              const message3 = {
                key: this.props.messages.length,
                type: "botMessageContainer",
                message: content1
              }
              
              this.props.addMessage(message3)
            }
            else if(typeof response.data.response.outputContexts[0].parameters.fields.summary !== "undefined"){
              const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"summary", "sessionId":this.props.sessionID})
              const content1 = response1.data.response.fulfillmentText
              const message3 = {
                key: this.props.messages.length,
                type: "botMessageContainer",
                message: content1
              }
              this.props.addMessage(message3)
            }
          }
          else if(intent === "Ask Question"){
            this.props.setQuestionType(response.data.response.outputContexts[0].parameters.fields.inputtype.stringValue)
            this.props.addMessage(message2)
          }
          else if(content.text.text[0] === "Congratulations!You solved the problem!"){
            this.props.addMessage(message2)
            const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"summary", "sessionId":this.props.sessionID})
            const content1 = response1.data.response.fulfillmentText
            const message3 = {
              key: this.props.messages.length,
              type: "botMessageContainer",
              message: content1
            }
            this.props.addMessage(message3)
            this.props.setMistake(response1.data.outputContexts[0].parameters.fields.mistake.numberValue)
          }
          else{
            this.props.addMessage(message2)
          }
          
          
        } catch (error) {
          
        }
        
        this.setState({message: ""})
        console.log(this.props)
    }

    componentDidUpdate(prevProps){
        if(prevProps.messages !== this.props.messages){
            //change the problem and its variable names
            if(this.props.messages[this.props.messages.length-1].message === "Next Problem"){
                this.props.setProgress();
                this.props.setProblem("Problem N");
                this.props.setInventory1Name("Inventory 1");
                this.props.setInventory2Name("Inventory 2");
                this.props.setItemName("item1");
            }
        }
    }

    render() {
        return (
            <div className="chatContainer">
                <div className="textBox">Chatbox</div>
                <div className="chatLogContainer">
                {this.props.messages.length === 0 ? "" : this.props.messages.map((msg) => <div className={msg.type} key={msg.key}>{msg.message}</div>)}
                    <AlwaysScrollToBottom />
                </div>
                <form className="chatTextContainer" onSubmit={this.onSubmitMessage}>
                    <input autoComplete="off" required type="text" className="messageInput" onChange={this.onChange} value={this.state.message} id="message" placeholder="Type your message here!"/>
                    <div className="messageSend">
                        <button className="send"></button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        currentProgress: state.currentProgress,
        messages: state.messages,
        sessionID: state.sessionID,


        problem : state.problem,
        inventoryOneName: state.inventoryOneName,
        inventoryTwoName: state.inventoryTwoName,
        itemName: state.itemName,

        currentUser: state.currentUser,
        userName : state.userName,
    };
}


function mapDispatchToProps(dispatch){
    return {
        setProgress: (msgObject) => {
            dispatch({type: "SET_PROGRESS", payload: msgObject})
        },
        addMessage: (msgObject) => {
            dispatch({type: "ADD_MESSAGE", payload: msgObject})
        },
        setSession: (userObject) => {
            dispatch({type: "SET_SESSION", payload: userObject})
        },


        setProblem: (msgObject) => {
          dispatch({type: "SET_PROBLEM", payload: msgObject})
        },
        setInventory1Name: (userObject) => {
            dispatch({type: "SET_INVENTORY1NAME", payload: userObject})
        },
        setInventory2Name: (userObject) => {
            dispatch({type: "SET_INVENTORY2NAME", payload: userObject})
        },
        setItemName: (userObject) => {
            dispatch({type: "SET_ITEMNAME", payload: userObject})
        },


        setUser: (userObject) => {
            dispatch({type: "SET_USER", payload: userObject})
        },
        setName: (userObject) => {
            dispatch({type: "SET_NAME", payload: userObject})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(chatbox)
