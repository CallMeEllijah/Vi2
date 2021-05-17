import React, { Component } from 'react';
import {connect} from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import trumpetInvetory from '../datas/trumpets'
import appleInvetory from '../datas/apples'

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
  background: isDragging ? 'lightgreen' : '',
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
  border: "1px solid grey"
})
//---------------------------------------------------------------------------------------------------------------------------------------------------------
class body extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: "Talk to Vi at the chatbox on the lower right of the screen to start!",
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
      if(this.props.messages[this.props.messages.length-1].message === "trumpets"){ //change such that if question contains
        this.setState({
          question: "Bob and Ada went to a music store. Bob bought 5 trumpets while Ada bought 3 trumpets on display. How many trumpets did both of them buy in total?", //put question here
          list1: trumpetInvetory,
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
              title: "Bob's Items"
            },
            {
              droppableId: 'droppable3',
              listId: 'list3',
              title: "Ada's Items"
            }
          ]
        })
      }
      if(this.props.messages[this.props.messages.length-1].message === "apples"){
        this.setState({
          question: "Joe and Sam went to the market to buy apples. Joe bought 2 apples and Sam bought 3 apples. How many apples did they buy in total?",
          list1: appleInvetory,
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
              title: "Joe's Items"
            },
            {
              droppableId: 'droppable3',
              listId: 'list3',
              title: "Sams's Items"
            }
          ]
        })
      }
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
  //for typing in inputs
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  //to send inputs from local to backend
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state)
  }
  //function will contain passing of the dragabols data
  dragCheck = e => {
    e.preventDefault();
    console.log(this.props);
  }
  //function will contain passing of the number setnence data
  numSenCheck = e => {
    e.preventDefault();
    console.log(this.props);
  }

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
        <form className="infoContainer equation" onSubmit={this.onSubmit}>
          <h3>NUMBER SENTENCE:</h3>
          <input type="number" className="equators" placeholder="10" value={this.state.nsO1} id="nsO1" onChange={this.onChange}/>
          <select id="nsOP" className="equators" value={this.state.nsOP} onChange={this.onChange}>
            <option value="" disabled defaultValue>select</option>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="/">÷</option>
            <option value="x">x</option>
          </select>
          <input type="number" className="equators" placeholder="10" value={this.state.nsO2} id="nsO2" onChange={this.onChange}/>
          =
          <input type="number" className="equators" placeholder="10" value={this.state.nsO3} id="nsO3" onChange={this.onChange}/>
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
    draggables: state.draggables
  }
}

function mapDispatchToProps(dispatch){
  return {
    setDrags: (dragObj) => {
      dispatch({type: "SET_DRAGS", payload: dragObj})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(body)