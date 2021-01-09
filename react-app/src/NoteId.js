import React, { Component } from "react";
import {Route, useParams} from "react-router-dom";
import axios from 'axios';

var currNote = '';

    const getNote = (id) => {
        axios.get('http://localhost:4004/note/' + id).then(note => {
        currNote = note.data.note
        })
      }

const NoteId = () => {

    let {id} = useParams()
    getNote(id)

    return (
        <h3>{currNote}</h3>

    );

}

export default NoteId;