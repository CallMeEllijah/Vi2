import Axios from 'axios';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import eggInvetory from '../datas/egg'
import marbleInvetory from '../datas/marble'
import fishInvetory from '../datas/fish'
import flowerInvetory from '../datas/flower'
import guavaInvetory from '../datas/guava'
import pencilInvetory from '../datas/pencil'
import flower from '../datas/flower';
import marble from '../datas/marble';
import guava from '../datas/guava';
import fish from '../datas/fish';

//--------------------------------------------------------------------------------------------------------------------------------------------------------- for draggables
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)
  destClone.splice(droppableDestination.index, 0, removed)
  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone
  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  width: "98%",
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#EDE9E8',
  borderRadius: '5px',
  border: '2px solid black',
  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : '',
  width: '15%',
  height: "95%",
  overflowY: "scroll",
  minWidth: "20%",
  marginTop: "5px",
  marginBottom: "5px",
  borderRadius: "5px",
  border: "1px solid grey",
  padding: "0px 10px 0px 10px"
})
//------------------------------------------------end draggables--------------------------------------------------------------------------------- 

class body extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: this.props.problem,
      nsO1: "",
      nsOP: "",
      nsO2: "",
      nsO3: "",
      list1: [],
      list2: [],
      list3: [],
      lists: [
        {
          droppableId: 'droppable1',
          listId: 'list1',
          title: 'Inventory'
        },
        {
          droppableId: 'droppable2',
          listId: 'list2',
          title: ''
        },
        {
          droppableId: 'droppable3',
          listId: 'list3',
          title: ''
        }
      ]
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------- for draggables
  droppableIds = {
    droppable1: 'list1',
    droppable2: 'list2',
    droppable3: 'list3'
  }
  getList = id => this.state[this.droppableIds[id]]
  onDragEnd = result => {
    const { source, destination } = result
    // dropped outside the list
    if (!destination) { return }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      )
      let copiedState = Object.assign({}, this.state)
      if (source.droppableId === 'droppable1') {
        copiedState.list1 = items
      } else if (source.droppableId === 'droppable2') {
        copiedState.list2 = items
      } else if (source.droppableId === 'droppable3') {
        copiedState.list3 = items
      }
      this.setState(copiedState)
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      )
      console.warn('result', result)
      this.setState({
        list1: result.droppable1 ? result.droppable1 : this.state.list1,
        list2: result.droppable2 ? result.droppable2 : this.state.list2,
        list3: result.droppable3 ? result.droppable3 : this.state.list3
      })
    }
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //checks everytime components or props changes
  componentDidUpdate(prevProps){
    //change such that if question contains trumpets then change to trumpets... so on and so forth
    if(prevProps.messages !== this.props.messages){
      if(this.props.problem.includes("fishes") && this.props.messages[this.props.messages.length-1].message.includes("Problem number 1")){
        console.log(prevProps)
        this.setState({
          question: this.props.problem,
          list1: fishInvetory, //fish
          list2: [],
          list3: [],
          lists: [
            {
              droppableId: 'droppable1',
              listId: 'list1',
              title: 'Fish'
            },
            {
              droppableId: 'droppable2',
              listId: 'list2',
              title: "Mang Rudy's galunggong"
            },
            {
              droppableId: 'droppable3',
              listId: 'list3',
              title: "Mang Rudy's bangus"
            }
          ]
        })
      }
      if(this.props.problem.includes("marbles")&& this.props.messages[this.props.messages.length-1].message.includes("Problem number 2")){
        this.setState({
          question: this.props.problem,
          list1: marbleInvetory, //marbles
          list2: [],
          list3: [],
          lists: [
            {
              droppableId: 'droppable1',
              listId: 'list1',
              title: 'Marbles'
            },
            {
              droppableId: 'droppable2',
              listId: 'list2',
              title: "Maria's marbles at the start"
            },
            {
              droppableId: 'droppable3',
              listId: 'list3',
              title: "Maria's marbles after giving to Raul"
            }
          ]
        })
        //start method of assessmentlevel-------------------------------------------------------------------------------------
        //try{
        //  console.log(this.props)
        //  Axios.post("/updateAssessmentLevel", {_id: this.props.currentUser, problemno: this.props.problemno, mistakesU: this.props.mistakesU, mistakesF: this.props.mistakesF, mistakesC: this.props.mistakesC})
        //} catch {
        //  console.log("welp no workie")
        //}
        //-------------------------------------------------------------------------------------
      }
      if(this.props.problem.includes("pencils")&& this.props.messages[this.props.messages.length-1].message.includes("Problem number 3")){
        this.setState({
          question: this.props.question,
          list1: pencilInvetory, //pencils
          list2: [],
          list3: [],
          lists: [
            {
              droppableId: 'droppable1',
              listId: 'list1',
              title: 'Inventory'
            },
            {
              droppableId: 'droppable2',
              listId: 'list2',
              title: "Maria's pencils"
            },
            {
              droppableId: 'droppable3',
              listId: 'list3',
              title: "Petra's pencils"
            }
          ]
        })
      }
      if(this.props.problem.includes("guava")&& this.props.messages[this.props.messages.length-1].message.includes("Problem number 4")){
        this.setState({
          question: this.props.question,
          list1: guavaInvetory, //guava
          list2: [],
          list3: [],
          lists: [
            {
              droppableId: 'droppable1',
              listId: 'list1',
              title: 'Inventory'
            },
            {
              droppableId: 'droppable2',
              listId: 'list2',
              title: "Guava per bayong"
            },
            {
              droppableId: 'droppable3',
              listId: 'list3',
              title: "Paula's guavas"
            }
          ]
        })
      }
      if(this.props.problem.includes("egg")&& this.props.messages[this.props.messages.length-1].message.includes("Problem number 5")){
        this.setState({
          question: this.props.question,
          list1: eggInvetory, //eggs
          list2: [],
          list3: [],
          lists: [
            {
              droppableId: 'droppable1',
              listId: 'list1',
              title: 'Inventory'
            },
            {
              droppableId: 'droppable2',
              listId: 'list2',
              title: "Ate Lory's eggs"
            },
            {
              droppableId: 'droppable3',
              listId: 'list3',
              title: "Eggs per Bibingka"
            }
          ]
        })
      }
      if(this.props.problem.includes("flower")&& this.props.messages[this.props.messages.length-1].message.includes("Problem number 6")){
        this.setState({
          question: this.props.question,
          list1: flowerInvetory, //flowers
          list2: [],
          list3: [],
          lists: [
            {
              droppableId: 'droppable1',
              listId: 'list1',
              title: 'Inventory'
            },
            {
              droppableId: 'droppable2',
              listId: 'list2',
              title: "Basket #1"
            },
            {
              droppableId: 'droppable3',
              listId: 'list3',
              title: "Basket #2"
            }
          ]
        })
      }
      /* when finished just fix how it detects
      if(this.props.messages[this.props.messages.length-1].message === "finish"){
        this.setState({
          question: "Continue talking to Vi at the chatbox on the lower right of the screen to continue!",
          list1: [],
          list2: [],
          list3: [],
          lists: [
            {
              droppableId: 'droppable1',
              listId: 'list1',
              title: 'Inventory'
            },
            {
              droppableId: 'droppable2',
              listId: 'list2',
              title: ""
            },
            {
              droppableId: 'droppable3',
              listId: 'list3',
              title: ""
            }
          ],
          nsO1: "",
          nsO2: "",
          nsO3: "",
          nsOP: ""
        })
      }
      */
    } else if(prevProps.draggables.operand1 !== this.state.list2.length || prevProps.draggables.operand2 !== this.state.list3.length){
      const dragObjs = {
        operand1: this.state.list2.length,
        operand2: this.state.list3.length
      }
      try{
        this.props.setDrags(dragObjs)
      }catch{}
    }
  }
  //--------------------------------------------------------------------------------------
  //for typing in inputs
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
   //-------------------------------------------------------------------------------------


  //FOR TESTING PURPOSES FOR TESTING PURPOSESFOR TESTING PURPOSES FOR TESTING PURPOSES FOR TESTING PURPOSES FOR TESTING PURPOSESFOR TESTING PURPOSES FOR TESTING PURPOSES FOR TESTING PURPOSES 
  onSubmit = e => {
    e.preventDefault();
  }
  //FOR TESTING PURPOSES FOR TESTING PURPOSESFOR TESTING PURPOSESFOR TESTING PURPOSES FOR TESTING PURPOSES FOR TESTING PURPOSES FOR TESTING PURPOSES FOR TESTING PURPOSES FOR TESTING PURPOSES 


  //----------------------------------function will contain passing of the dragabols data
  dragCheck = async e => {
    e.preventDefault();
    const questionType = this.props.questiontype
    console.log("pasok sa drag check")
    console.log("question Type" + questionType)
    if(questionType === "firstdragbox"){
      
        const response = await Axios.post('/api/dialogflow/textQuery',{text:this.state.list2.length})
        const content = response.data.fulfillmentMessages[0]
        const message = {
          key: this.props.messages.length,
          type: "bot",
          message: content.text.text[0]
        }
        this.props.addMessage(message)
    }
    else if(questionType === "seconddragbox"){

        const response = await Axios.post('/api/dialogflow/textQuery',{text:this.state.list3.length})
        const content = response.data.fulfillmentMessages[0]
        const message = {
          key: this.props.messages.length,
          type: "bot",
          message: content.text.text[0]
        }
        this.props.addMessage(message)
    }
  }
  //-------------------------------------------------------------------------------------
  //function will contain passing of the number setnence data
  numSenCheck = async e => {
    e.preventDefault();
    const questionType = this.props.questiontype
    console.log(questionType)
    var response
    console.log(this.state.nsO3)
    if(questionType === "operationbox"){
      var operation

      if(this.state.nsOP == "+")
        operation = "addition"
      else if(this.state.nsOP == "-")
        operation = "subtraction"
      else if(this.state.nsOP == "*")
        operation = "multiplication"
      else if(this.state.nsOP == "/")
        operation = "division"
      
      response = await Axios.post('/api/dialogflow/textQuery',{text:operation})
    }
    else if(questionType === "firstnumberbox"){
      response = await Axios.post('/api/dialogflow/textQuery',{text:this.state.nsO1})
    }
    else if(questionType === "secondnumberbox"){
      response = await Axios.post('/api/dialogflow/textQuery',{text:this.state.nsO2})
    }
    else if(questionType === "finalanswerbox"){
      response = await Axios.post('/api/dialogflow/textQuery',{text:this.state.nsO3})
    }

    const content = response.data.fulfillmentMessages[0]
    const message = {
      key: this.props.messages.length,
      type: "bot",
      message: content.text.text[0]
    }
    this.props.addMessage(message)
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
   //-------------------------------------------------------------------------------------

  render() {
    return (
      <div className="bodyContainer">
      {/*-------------------------------------------------------------------------------------------*/}
        <div className="infoContainer problem">
          <h2 className="probContainer">
          {this.state.question}
          </h2>
        </div>
        {/*-------------------------------------------------------------------------------------------*/}
        <div className="infoContainer dragabols">
        <h1>DRAG</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.lists.map((list, listIndex) =>
            <Droppable key={'list-droppable-' + listIndex} droppableId={list.droppableId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  <h4>
                    {list.title}
                  </h4>
                  {this.state[list.listId] && this.state[list.listId].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          { ...provided.draggableProps }
                          { ...provided.dragHandleProps }
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}>
                          <div>
                            {<img src={item.thumb} alt={item.name}/>} {item.name}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </DragDropContext>
        <button onClick={this.dragCheck} className="bodyButton">Check</button>
        </div>
        {/*-------------------------------------------------------------------------------------------*/}
        <form className="infoContainer equation" onSubmit={this.numSenCheck}>
          <h3>NUMBER SENTENCE:</h3>
      	  <input type="number" className="equators" placeholder="1st no." value={this.state.nsO1} id="nsO1" onChange={this.onChange}/>
          <select id="nsOP" className="equators" value={this.state.nsOP} onChange={this.onChange} style={{width: 130 + 'px'}}>
            <option value="" disabled defaultValue>Operation</option>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="/">÷</option>
            <option value="x">x</option>
          </select>
            <input type="number" className="equators" placeholder="2nd no." value={this.state.nsO2} id="nsO2" onChange={this.onChange}/>
          =
          <input type="number" className="equators" placeholder="Ans." value={this.state.nsO3} id="nsO3" onChange={this.onChange}/>
          <button className="bodyButton">Check</button>
        </form>
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
    problemno: state.problemno,
    draggables: state.draggables,
    questiontype : state.questiontype,
    problem : state.problem
  }
}

function mapDispatchToProps(dispatch){
  return {
    setProblemNo: (msgObject) => {
      dispatch({type: "ADD_MESSAGE", payload: msgObject})
    },
    setProblem: (msgObject) => {
      dispatch({type: "SET_PROBLEM", payload: msgObject})
    },
    setDrags: (dragObj) => {
      dispatch({type: "SET_PROBLEMNO", payload: dragObj})
    },
    addMessage: (msgObject) => {
      dispatch({type: "ADD_MESSAGE", payload: msgObject})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(body)
