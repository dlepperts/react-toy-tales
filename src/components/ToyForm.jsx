import React, { Component } from 'react';

class ToyForm extends Component {

  constructor() {
    super()
    this.state = {
      name: "",
      image: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const toy = {
      ...this.state, 
      likes: 0
    }

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy)
    }

    fetch('http://localhost:3000/toys', reqObj)
    .then(resp => resp.json()) 
    .then(newToy => {
      this.props.addToy(newToy)
      this.setState({
        name: '',
        image: ''
      })
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" onChange={this.handleChange} value={this.state.name} name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" onChange={this.handleChange} value={this.state.value} name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
