import React from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';
import './NoteId.css'

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
        <div className="current-note">
            <h3>Note accessed by id:</h3>
            <h3>{currNote}</h3>
        </div>

    );

}

export default NoteId;