import React, { Component } from 'react';
import {connect} from 'react-redux'

class App extends Component {

  constructor(){
    super();
    this.state = {
      name: ""
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

  checkProps = e => {
    e.preventDefault();

    console.log(this.props.currentUser)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.name} id="name"></input>
          <button>submit</button>
        </form>
        <button onClick={this.checkProps}>Check props</button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    setUser: (userObject) => {
      dispatch({type: "SET_USER", payload: userObject})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)