import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Container, TextField } from "@material-ui/core";
import axios from 'axios';

const styles = theme => ({
  root: {
      '& .MuiTextField-root': {
          margin: theme.spacing(1),
          minWidth: 230,
      }
  },
  formControl: {
      margin: theme.spacing(1),
      minWidth: 230,
  },
  smMargin: {
      margin: theme.spacing(1)
  },
  noteField: {
      height: 400
  }
})

class App extends Component {
  constructor() {
    super()
  
    this.state = {
      notes: [],
      name:'',
      note: '',
      newNote: '',
      newName:'',
      editInput: false,
      editNote: ''
    }
  
    this.getNote = this.getNote.bind(this)
    this.addName = this.addName.bind(this)
    this.addNote = this.addNote.bind(this)
    this.sendNote = this.sendNote.bind(this)
    this.editClick = this.editClick.bind(this)
    this.editNote = this.editNote.bind(this)
  }
  
  componentDidMount() {
    axios.get('http://localhost:4004/notes').then(notes => {
        this.setState({
          // notes: [...this.state.notes, res]
          notes: notes.data
        })
        console.log(this.state.notes)
      })
  }
  
  getNote(id) {
    axios.get('http://localhost:4004/note/' + id).then(note => {
      this.setState({
        note: note.data
      })
    })
  }
  
  removeNote(id) {
    axios.delete('http://localhost:4004/note/' + id).then(() => {
      axios.get('http://localhost:4004/notes').then(notes => {
        this.setState({
          notes: notes.data
        })
      })
    })
  }

  addName(e) {
    this.setState({
      newName: e.target.value
    })
  }

  addNote(e) {
      this.setState({
        newNote: e.target.value
      })
  }
  
  sendNote() {
    var list = this.state.notes
    var num = [];
    list.map(e => num.push(e.id))
    var highest = Math.max.apply(null, num)
  
    var obj = {
      name: this.state.newName,
      note: this.state.newNote,
      id: highest + 1
    }
    if(obj.item) {
      axios.post('http://localhost:4004/notes', obj).then(() => {
        axios.get('http://localhost:4004/Notes').then(notes => {
          console.log(notes)
        this.setState({
          notes: notes.data
        })
      })
    })
    this.setState({
      newName: '',
      newNote: ''
    })
    }
  }
  
  editClick() {
    
    if(this.state.editInput) {
      this.setState({
      editInput: false
    })
    } else {
      this.setState({
      editInput: true
    })
    }
  }
  
  editNote(e) {
      this.setState({
        editNote: e.target.value
      })
  }
  
  sendEditProduct(e) {
    var obj = {
      item: this.state.editNote,
      id: e
    }
  console.log(obj)
  axios.put('http://localhost:4004/updateNote', obj).then(() => {
      axios.get('http://localhost:4004/notes').then(notes => {
        this.setState({
          notes: notes.data
        })
      })
      this.setState({
      editNote: '',
      editInput: false
    })
    })
  }
  
  
    render() {
          const notes = this.state.notes.map((note, i) => (
            <div key={i} className='notesContainer'>
              <ul className='notes'>
                  { !this.state.editInput ? <h3 onClick={() => this.getNote(note.id)}> { note.note } </h3> : null }
                  { this.state.editInput ? <div> <input onChange={ this.editNote }/> <button onClick={() => this.sendEditNote(note.id)}>Change</button> </div>: null }
                  <div className='buttonContainer'>
                  <Button onClick={ this.editClick }>Edit</Button>
                  <Button onClick={() => this.removeNote(note.id)}>Delete</Button>
                  </div>
              </ul>
            </div>
          ))
      return (

        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Notes App</h2>
          </div>
          
          <TextField 
            className='topInput' 
            label ='Name' 
            onChange={ this.addName } 
            value={ this.state.newName }
            />

          <div></div>

          <TextField 
            className='noteInput' 
            label = 'Note' 
            multiline
            onChange={ this.addNote } 
            value={ this.state.newNote }
            />

          <div></div>

          <Button onClick={ this.sendNote }>Add Note</Button>
            { notes }
             <h1>{ this.state.note.note }
            </h1> 
        </div>
      );

  
    }
  }
  
  export default App;
