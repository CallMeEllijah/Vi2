import Axios from 'axios';
import React, { Component } from 'react';
import {connect} from 'react-redux'


class interactables extends Component {

    constructor(){
        super();
        this.state = {
            sampleAmount: [],
            sampleAmount2: [],
            css: "interactContainer"
        }
    }

    addPic = () => {
        if(this.state.sampleAmount.length <= 9 && this.props.itemName !== ""){
            var temp = this.state.sampleAmount.length
            this.setState({
                sampleAmount: [...this.state.sampleAmount, {type: this.props.itemName, key:temp}]
            })
        }
    }

    removePic = () => {
        var array = [...this.state.sampleAmount]
        var index = this.state.sampleAmount.length-1
        if(index !== -1){
            array.splice(index, 1)
            this.setState({sampleAmount: array})
        }
    }

    addPic2 = () => {
        if(this.state.sampleAmount2.length <= 9 && this.props.itemName !== ""){
            var temp = this.state.sampleAmount2.length
            this.setState({
                sampleAmount2: [...this.state.sampleAmount2, {type: this.props.itemName, key:temp}]
            })
        }
    }

    removePic2 = () => {
        var array = [...this.state.sampleAmount2]
        var index = this.state.sampleAmount2.length-1
        if(index !== -1){
            array.splice(index, 1)
            this.setState({sampleAmount2: array})
        }
    }

    submitAmount = () => {
        console.log("sample amount 1 is " + this.state.sampleAmount.length + " and then sample amount 2 is " + this.state.sampleAmount2.length)
    }
    //----------------------------------function will contain passing of the dragabols data
    dragCheck = async e => {
        e.preventDefault();
        const questionType = this.props.questiontype
        console.log("pasok sa drag check")
        console.log("question Type" + questionType)
        if(questionType === "firstdragbox"){
        
            const response = await Axios.post('/api/dialogflow/textQuery',{"queryText":this.state.list2.length, "sessionId":this.props.sessionID})
            const content = response.data.response.fulfillmentText
            const message = {
            key: this.props.messages.length,
            type: "bot",
            message: content
            }
            this.props.addMessage(message)
            if(typeof response.data.response.outputContexts[0].parameters.fields.requestion !== "undefined"){
            const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"RE", "sessionId":this.props.sessionID})
            const content1 = response1.data.response.fulfillmentText
            const message3 = {
                key: this.props.messages.length,
                type: "bot",
                message: content1
            }
            this.props.addMessage(message3)
            }
        }
        else if(questionType === "seconddragbox"){

            const response = await Axios.post('/api/dialogflow/textQuery',{"queryText":this.state.list3.length, "sessionId":this.props.sessionID})
            const content = response.data.response.fulfillmentText
            const message = {
            key: this.props.messages.length,
            type: "bot",
            message: content
            }
            this.props.addMessage(message)
            if(typeof response.data.response.outputContexts[0].parameters.fields.requestion !== "undefined"){
            const response1 = await Axios.post('/api/dialogflow/textQuery',{"queryText":"RE", "sessionId":this.props.sessionID})
            const content1 = response1.data.response.fulfillmentText
            const message3 = {
                key: this.props.messages.length,
                type: "bot",
                message: content1
            }
            this.props.addMessage(message3)
            }
        }
    }
    //-----------------------------------------
    resetAmount = () => {
        this.setState({
            sampleAmount: [],
            sampleAmount2: []
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.messages !== this.props.messages){
            // if(this.props.messages[this.props.messages.length-1].message === "Next Problem"){
            //     this.setState({
            //         sampleAmount: [],
            //         sampleAmount2: [],
            //         css: "interactContainerSelected"
            //     })
            // } else {
            //     this.setState({
            //         css: "interactContainer"
            //     })
            // }
            this.setState({
                sampleAmount: [],
                sampleAmount2: [],
                css: "interactContainerSelected"
            })
        }
    }

    render() {
        return (
            <div className={this.state.css}>
                <div className="interactablesRepresentationContainer">
                    <div className="individualRepresentationContainer">
                        <div className="representationContainer">
                            <div className="textBox">{this.props.inventoryOneName}</div>
                            <div className="picsContainer">
                                {this.state.sampleAmount.length === 0 ? "" : this.state.sampleAmount.map((pic) => <div className={pic.type} key={pic.key}></div>)}
                            </div>
                        </div>
                        <div className="interactablesActionContainer">
                            <button className="upArrow" onClick={this.addPic}></button>
                            <button className="downArrow" onClick={this.removePic}></button>
                        </div>
                    </div>
                    <div className="individualRepresentationContainer">
                        <div  className="representationContainer">
                            <div className="textBox">{this.props.inventoryTwoName}</div>
                            <div className="picsContainer">
                                {this.state.sampleAmount2.length === 0 ? "" : this.state.sampleAmount2.map((pic) => <div className={pic.type} key={pic.key}></div>)}
                            </div>
                        </div>
                        <div className="interactablesActionContainer">
                            <button className="upArrow" onClick={this.addPic2}></button>
                            <button className="downArrow" onClick={this.removePic2}></button>
                        </div>
                    </div>
                </div>
                <div className="interactablesActionContainer">
                    <button className="check" onClick={this.submitAmount}></button>
                    <button className="cancel" onClick={this.resetAmount}></button>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(interactables)
