import Axios from 'axios';
import React, { Component } from 'react';
import {connect} from 'react-redux'

class numberSentence extends Component {

    constructor(){
        super();
        this.state = {
            //css for values
            addSelected: "operatorUnchosen",
            subSelected: "operatorUnchosen",
            divSelected: "operatorUnchosen",
            mulSelected: "operatorUnchosen",

            //operands and operator
            nsO1: "",
            nsOP: "",
            nsO2: "",
            nsO3: "",

            //css
            css: "numSenContainer"
        }
    }

    //data manipulation for input boxes
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    //css manipulation for selected operator
    changeAdd = async () => {
        await this.setState({
            addSelected: "operatorChosen",
            subSelected: "operatorUnchosen",
            divSelected: "operatorUnchosen",
            mulSelected: "operatorUnchosen",
            nsOP: "addition"
        })
    }
    changeSub = async () => {
        await this.setState({
            addSelected: "operatorUnchosen",
            subSelected: "operatorChosen",
            divSelected: "operatorUnchosen",
            mulSelected: "operatorUnchosen",
            nsOP: "subtraction"
        })
    }
    changeDiv = async () => {
        await this.setState({
            addSelected: "operatorUnchosen",
            subSelected: "operatorUnchosen",
            divSelected: "operatorChosen",
            mulSelected: "operatorUnchosen",
            nsOP: "division"
        })
    }
    changeMul = async () => {
        await this.setState({
            addSelected: "operatorUnchosen",
            subSelected: "operatorUnchosen",
            divSelected: "operatorUnchosen",
            mulSelected: "operatorChosen",
            nsOP: "multiplication"
        })
    }

    //checking and erasing of data
    checkInputs = async e => {
        e.preventDefault();
        const questionType = this.props.questiontype
        
        var response
        
        if(questionType === "operationbox"){
            console.log("operation")
            console.log(this.state.nsOP)
            response = await Axios.post('/api/dialogflow/textQuery',{"queryText":this.state.nsOP,"sessionId":this.props.sessionID})
        }
        else if(questionType === "firstnumberbox"){
            console.log("first")
            console.log(this.state.nsO1)
            response = await Axios.post('/api/dialogflow/textQuery',{"queryText":this.state.nsO1,"sessionId":this.props.sessionID})
        }
        else if(questionType === "secondnumberbox"){
            console.log("second")
            console.log(this.state.nsO2)
            response = await Axios.post('/api/dialogflow/textQuery',{"queryText":this.state.nsO2,"sessionId":this.props.sessionID})
        }
        else if(questionType === "finalanswerbox"){
            console.log("final")
            console.log(this.state.nsO3)
            response = await Axios.post('/api/dialogflow/textQuery',{"queryText":this.state.nsO3,"sessionId":this.props.sessionID})
        }
        
        
        console.log(response)
        const content = response.data.response.fulfillmentText
        const message = {
        key: this.props.messages.length,
        type: "botMessageContainer",
        message: content
        }
        
        await this.props.addMessage(message)

        if(typeof response.data.response.outputContexts[0].parameters.fields.requestion !== "undefined"){
        const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"RE", "sessionId":this.props.sessionID})
        const content1 = response1.data.response.fulfillmentText
        const message3 = {
            key: this.props.messages.length,
            type: "botMessageContainer",
            message: content1
        }
            await this.props.addMessage(message3)
        }
        else if(typeof response.data.response.outputContexts[0].parameters.fields.summary !== "undefined"){
        console.log("kek the 1st")
        const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"summary", "sessionId":this.props.sessionID})
        const content1 = response1.data.response.fulfillmentText
        const message3 = {
            key: this.props.messages.length,
            type: "botMessageContainer",
            message: content1
        }
        console.log(response1)
        console.log("kek the 2nd")

        var mistakeC = response1.data.response.outputContexts[0].parameters.fields.mistakeC.numberValue
        var mistakeF = response1.data.response.outputContexts[0].parameters.fields.mistakeF.numberValue
        var mistakeU = response1.data.response.outputContexts[0].parameters.fields.mistakeU.numberValue

        Axios.post("/updateAssessmentLevel", {id: this.props.currentUser, problemno : response1.data.response.outputContexts[0].parameters.fields.problemnumber.numberValue - 1, mistakesU: mistakeU, mistakesF: mistakeF, mistakesC: mistakeC}).then(res => {
            console.log("updated assessment levels")
        })

        await this.props.addMessage(message3)
        
        if(typeof response1.data.response.outputContexts[0].parameters.fields.endlesson !== "undefined"){
            console.log("pasok sa end")
            const response2 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"end", "sessionId":this.props.sessionID})
            const content2 = response2.data.response.fulfillmentText
            const message4 = {
            key: this.props.messages.length,
            type: "botMessageContainer",
            message: content2
            }
            this.props.addMessage(message4)
            Axios.post("/addchatlog", {id: this.props.currentUser, messages: this.props.messages}).then(res => {
                console.log("added chatlog")
            })
        }
        }
    }
    //-------------------------------------------------------------------------------------


    eraseInputs = () => {
        this.setState({
            addSelected: "operatorUnchosen",
            subSelected: "operatorUnchosen",
            divSelected: "operatorUnchosen",
            mulSelected: "operatorUnchosen",
            nsO1: "",
            nsOP: "",
            nsO2: "",
            nsO3: ""
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.messages !== this.props.messages){
            if(this.props.questiontype === "firstnumberbox" || this.props.questiontype === "secondnumberbox" || this.props.questiontype === "finalanswerbox" || this.props.questiontype === "operationbox"){
                this.setState({
                    css: "numSenContainerSelected"
                })
            }  else if (this.props.questiontype === "New Problem") {
                this.setState({
                    addSelected: "operatorUnchosen",
                    subSelected: "operatorUnchosen",
                    divSelected: "operatorUnchosen",
                    mulSelected: "operatorUnchosen",
                    nsO1: "",
                    nsOP: "",
                    nsO2: "",
                    nsO3: "",
                    css: "numSenContainer"
                })
            } else {
                this.setState({
                    css: "numSenContainer"
                })
            }
        }
    }

    render() {
        return (
            <div className={this.state.css}>
                <div className="operandContainer">
                    <input type="number" value={this.state.nsO1} id="nsO1" onChange={this.onChange}  placeholder="1st Number" className="numSenInput"/>
                </div>
                <div className="operatorContainer">
                    <div className={"individualOperatorContainer " + this.state.addSelected}  onClick={this.changeAdd}>
                        <button className={"add"}></button>
                    </div>
                    <div className={"individualOperatorContainer " + this.state.subSelected}  onClick={this.changeSub}>
                        <button className={"sub"}></button>
                    </div>
                    <div className={"individualOperatorContainer " + this.state.divSelected} onClick={this.changeDiv}>
                        <button className={"div"}></button>
                    </div>
                    <div className={"individualOperatorContainer " + this.state.mulSelected}  onClick={this.changeMul}>
                        <button className={"mul"}></button>
                    </div>
                </div>
                <div className="operandContainer">
                    <input type="number"value={this.state.nsO2} id="nsO2" onChange={this.onChange} placeholder="2nd Number"  className="numSenInput"/>
                </div>
                <div style={{fontSize: "50px"}}>
                    =
                </div>
                <div className="operandContainer">
                    <input type="number" value={this.state.nsO3} id="nsO3" onChange={this.onChange} placeholder="Final Answer"  className="numSenInput"/>
                </div>
                <div className="nsActionContainer">
                    <button className="check" onClick={this.checkInputs}></button>
                    {/* <button className="cancel" onClick={this.eraseInputs}></button> */}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
return {
    currentProgress: state.currentProgress,
    messages: state.messages,
    sessionID: state.sessionID,
    questiontype: state.questiontype,

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
        addMessage: (msgObject) => {
            dispatch({type: "ADD_MESSAGE", payload: msgObject})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(numberSentence)
