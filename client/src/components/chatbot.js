import Axios from 'axios';
import React, { Component, useRef, useEffect } from 'react';
import {connect} from 'react-redux'
import cblogo from '../media/cblogo.png'

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
        const response = await Axios.post('/api/dialogflow/eventQuery',{"event":"IntroduceVi2"})
        const content = response.data.fulfillmentMessages[0]
        const message2 = {
          key: this.props.messages.length,
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
          key: this.props.messages.length,
          type: "user",
          message: this.state.message
        }
        this.props.addMessage(message)
        var input = this.state.message
        
        const textQueryVariable = {
          "text":input
        }
        
        try {
          const response = await Axios.post('/api/dialogflow/textQuery',textQueryVariable)
          
          const content = response.data.fulfillmentMessages[0]
          const intent = response.data.intent.displayName
          
          const message2 = {
            key: this.props.messages.length,
            type: "bot",
            message: content.text.text[0]
          }

          if(intent === "Show Problem"){
            this.props.setProblem(response.data.outputContexts[0].parameters.fields.problem.stringValue)
            this.props.addMessage(message2)
          }
          else if(intent === "Check Question Answer"){
            this.props.addMessage(message2)
            if(typeof response.data.outputContexts[0].parameters.fields.requestion !== "undefined"){
              const response1 = await Axios.post('/api/dialogflow/textQuery',{"text":"RE"})
              const content1 = response1.data.fulfillmentMessages[0]
              const message3 = {
                key: this.props.messages.length,
                type: "bot",
                message: content1.text.text[0]
              }
              this.props.addMessage(message3)
            }
            else if(typeof response.data.outputContexts[0].parameters.fields.summary !== "undefined"){
              const response1 = await Axios.post('/api/dialogflow/textQuery',{"text":"summary"})
              const content1 = response1.data.fulfillmentMessages[0]
              const message3 = {
                key: this.props.messages.length,
                type: "bot",
                message: content1.text.text[0]
              }
              this.props.addMessage(message3)
            }
          }
          else if(intent === "Ask Question"){
            console.log(response.data)
            this.props.setQuestionType(response.data.outputContexts[0].parameters.fields.inputtype.stringValue)
            this.props.addMessage(message2)
          }
          else if(content.text.text[0] === "Congratulations! You solved the problem!"){
            this.props.addMessage(message2)
            
            const response1 = await Axios.post('/api/dialogflow/textQuery',{"text":"summary"})
            const content1 = response1.data.fulfillmentMessages[0]
            const message3 = {
              key: this.props.messages.length,
              type: "bot",
              message: content1.text.text[0]
            }
            this.props.addMessage(message3)
            // ----------------------------replace setmistake to the proper mistake field
            this.props.setMistake(response1.data.outputContexts[0].parameters.fields.mistake.numberValue)
            // ---------------------------- if questione type = 1 or 2 or 3 or 4 or 5 and so on then setmistake either to U / F / C
          }
          else{
            this.props.addMessage(message2)
          }
          
          
        } catch (error) {
          
        }
        
        this.setState({message: ""})
    }

    //for updates
    componentDidUpdate(prevProps){
      if(prevProps.messages !== this.props.messages){
        if(this.props.messages[this.props.messages.length-1].message.includes("Do you want to start the lesson?")){
          Axios.post("/addUser", {name: this.props.messages[this.props.messages.length-2].message}).then(res => {
            this.props.setUser(res.data._id);
          })
        }
        if(this.props.messages[this.props.messages.length-1].message.includes("next problem")){
          Axios.post("/updateAssessmentLevel", {id: this.props.currentUser, problemno: this.props.problemno, mistakesU: this.mistakesU, mistakesF: this.mistakesF, mistakesC: this.mistakesC}).then(res => {
            console.log("updated assessment levels")
          })
        }
        if(this.props.messages[this.props.messages.length-1].message.includes("finished")){
          Axios.post("/addchatlog", {id: this.props.currentUser, messages: this.props.messages}).then(res => {
            console.log("added chatlog")
          })
        }
      }
    }

    render() {
        return (
        <div className="chatbotContainer">
          <img src={cblogo} style={{marginBottom:"-50px", marginTop:"-50px", minHeight:"260px", minWidth:"250px"}}/>
          <div className="chatBot">
            <h3 style={{margin:"0px 0px 0px 0px"}}>Chat with Vi2 below!</h3>
            <div className="chatLog">
              {this.props.messages.length === 0 ? "" : this.props.messages.map((msg) => <div className={msg.type} key={msg.key}>{msg.message}</div>)}
              <AlwaysScrollToBottom />
            </div>
            <form className="messageSendForm" onSubmit={this.onSubmitMessage}>
              <input required type="text" className="messageInput" onChange={this.onChange} value={this.state.message} id="message" placeholder="Enter your message here!"/>
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
    value1: state.value1,
    value2: state.value2,
    person1: state.person1,
    person2: state.person2,
    mistakesU: state.mistakesU,
    mistakesF: state.mistakesF,
    mistakesC: state.mistakesC,
    draggables: state.draggables,
    questiontype: state.questiontype,
    problem: state.problem
  }
}

function mapDispatchToProps(dispatch){
    return {
      setUser: (userObject) => {
        dispatch({type: "SET_USER", payload: userObject})
      },
      addMessage: (msgObject) => {
        dispatch({type: "ADD_MESSAGE", payload: msgObject})
      },
      setValue1: (msgObject) => {
        dispatch({type: "SET_VALUE1", payload: msgObject})
      },
      setValue2: (msgObject) => {
        dispatch({type: "SET_VALUE2", payload: msgObject})
      },
      setPerson1: (msgObject) => {
        dispatch({type: "SET_PERSON1", payload: msgObject})
      },
      setPerson2: (msgObject) => {
        dispatch({type: "SET_PERSON2", payload: msgObject})
      },
      setQuestionType: (msgObject) => {
        dispatch({type: "SET_QUESTION_TYPE", payload: msgObject})
      },
      setProblem: (msgObject) => {
        dispatch({type: "SET_PROBLEM", payload: msgObject})
      },
      setMistakeU: (msgObject) => {
        dispatch({type: "SET_MISTAKEU", payload: msgObject})
      },
      setMistakeF: (msgObject) => {
        dispatch({type: "SET_MISTAKEF", payload: msgObject})
      },
      setMistakeC: (msgObject) => {
        dispatch({type: "SET_MISTAKEC", payload: msgObject})
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(chatbot)