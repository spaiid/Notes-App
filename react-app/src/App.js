import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { Button, TextField } from "@material-ui/core";
import axios from 'axios';
import NoteId from './Components/NoteId.js';

class App extends Component {
  constructor() {
    super()
  
    this.state = {
      notes: [],
      note: '',
      newNote: '',
      editInput: false,
      usingParams: true,
      editNote: ''
    }
  
    this.getNote = this.getNote.bind(this)
    this.addNote = this.addNote.bind(this)
    this.sendNote = this.sendNote.bind(this)
    this.editClick = this.editClick.bind(this)
    this.editNote = this.editNote.bind(this)
    
  }

  componentDidMount() {
    axios.get('http://localhost:4004/notes').then(notes => {
        this.setState({
          notes: notes.data
        })
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
      note: this.state.newNote,
      id: highest + 1
    }
    if(obj.note) {
      axios.post('http://localhost:4004/notes', obj).then(() => {
        axios.get('http://localhost:4004/Notes').then(notes => {
          console.log(notes)
        this.setState({
          notes: notes.data
        })
      })
    })
    this.setState({
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
  
  sendEditNote(e) {
    var obj = {
      note: this.state.editNote,
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
              <ul>
                  { !this.state.editInput ? <h3 onClick={() => this.getNote(note.id)}> { note.note } </h3> : null }
                  { this.state.editInput ? <div> <TextField onChange={ this.editNote }/> <Button onClick={() => this.sendEditNote(note.id)}>Change</Button> </div>: null }

                  <div className='buttonContainer'>
                    <Button onClick={ this.editClick }>Edit</Button>
                    <Button onClick={() => this.removeNote(note.id)}>Delete</Button>
                  </div>
              </ul>
            </div>
          ))

            return (
              <BrowserRouter>
              <Switch>
                <Route path = "/:id" component = {NoteId}/>
              </Switch>
              <Switch>
                <Route path = "/">
                <div className="App">
                  <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Notes App</h2>
                  </div>
      
                <TextField 
                  className='noteInput' 
                  label = 'Note' 
                  multiline
                  onChange={ this.addNote } 
                  value={ this.state.newNote }
                  />
      
                <div></div>
      
                <Button onClick={ this.sendNote }>Add Note</Button>
                  {notes}
                  
                </div>

                </Route>
              </Switch>
                
              

              </BrowserRouter>
              
            );
          }
    }
  
  export default App;
