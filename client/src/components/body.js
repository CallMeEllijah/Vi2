import React, { Component } from 'react';
import {connect} from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import trumpetImage from '../media/trumpet.png'

// fake data
const trumpets = [
  {
    id: 'trumpet1',
    name: 'Trumpet',
    thumb: trumpetImage
  },
  {
      id: 'trumpet2',
      name: 'Trumpet',
      thumb: trumpetImage
  },
  {
      id: 'trumpet3',
      name: 'Trumpet',
      thumb: trumpetImage
  },
  {
      id: 'trumpet4',
      name: 'Trumpet',
      thumb: trumpetImage
  },
  {
      id: 'trumpet5',
      name: 'Trumpet',
      thumb: trumpetImage
  },
  {
      id: 'trumpet6',
      name: 'Trumpet',
      thumb: trumpetImage
  }
]

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
  padding: 0,
  margin: `0 0 1px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'lightgrey',

  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : '#eee',
  padding: 0,
  margin: '3px',
  width: 250
})

class body extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list1: trumpets,
      list2: [],
      list3: [],
      list4: []
    }
  }

  droppableIds = {
    droppable1: 'list1',
    droppable2: 'list2',
    droppable3: 'list3',
    droppable4: 'list4'
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
      } else if (source.droppableId === 'droppable4') {
        copiedState.list4 = items
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
        list3: result.droppable3 ? result.droppable3 : this.state.list3,
        list4: result.droppable4 ? result.droppable4 : this.state.list4
      })
    }
  }

  submit = e => {
    e.preventDefault();
    const dragObjs = {
      operand1: this.state.list2.length,
      operand2: this.state.list3.length,
      finalAns: this.state.list4.length
    }
    this.props.setDrags(dragObjs)
  }
  checkAns = e => {
    e.preventDefault();
    console.log(this.props)
  }

  render() {
    const lists = [
      {
        droppableId: 'droppable1',
        listId: 'list1',
        title: 'Inventory'
      },
      {
        droppableId: 'droppable2',
        listId: 'list2',
        title: 'Operand 1'
      },
      {
        droppableId: 'droppable3',
        listId: 'list3',
        title: 'Operand 2'
      },
      {
        droppableId: 'droppable4',
        listId: 'list4',
        title: 'Final Answer'
      }
    ]
    return (
      <div className="bodyContainer">
        <div className="infoContainer problem">"Bob and Ada went to a music store. Bob bought (operand 1) violins while Ada bought (operand 2) trumpets on display. How many instruments did both of them buy in total?"</div>
        <div className="infoContainer equation"><input type="text"/><input type="text"/><input type="text"/>=<input type="text"/></div>
        <div className="infoContainer dragabols">
        <DragDropContext onDragEnd={this.onDragEnd}>
          {lists.map((list, listIndex) =>
            <Droppable key={'list-droppable-' + listIndex} droppableId={list.droppableId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver),
                    {
                      height: "100%",
                      overflowY: "scroll",
                      backgroundColor: "red",
                      minWidth: "20%"
                    }}>
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
                          <div style={{ background: item.color }}>
                            {<img src={item.thumb}/>}
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
        <div style={{display:"flex", flexDirection:"column"}}>
        <button onClick={this.submit}>Submit</button>
        <button onClick={this.checkAns}>check</button>
        </div>
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
    setDrags: (dragObj) => {
      dispatch({type: "SET_DRAGS", payload: dragObj})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(body)