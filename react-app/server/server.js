const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Create server
const app = express()
app.use('/', express.static('public'));   // serve static files

app.use(bodyParser.json()); // support json encoded bodies, needed por post x-www-form-urlencoded to work
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

// Routes
// GET /allNotes
app.get('/Notes', (req, res) => {
  const allNotes = db.get('Notes')
    .value()
  res.send(allNotes)
})


// GET /note/:id
app.get('/note/:id', (req, res) => {
  const note = db.get('Notes')
    .find({ id: Number(req.params.id) })
    .value()
  res.send(note)
})


// DELETE /note/:id
app.delete('/note/:id', (req, res) => {
    const noteDeleted = db.get('Notes')
    .remove({ id: Number(req.params.id) })
    .write()
    res.send(noteDeleted)
})

// PUT /updateNote
app.put('/updateNote', (req, res) => {
    db.get('Notes')
    .find({ id: Number(req.body.id) })
   .assign({item: req.body.item})
   .write()
   res.send('updated')
})


// POST /Notes
app.post('/notes', (req, res) => {
  db.get('Notes').push({ id: req.body.id, name: req.body.name, note: req.body.note})
  .write()
  res.send('added')
})

// RESET DATABASE /reset
app.delete('/reset', (req, res) => {
    db.set('Notes', [])
    .write()
})


// Init
// db.defaults({ data: [] })
//   .write()
//   .then(() => {
    app.listen(4004, () => console.log('Server is listening'))
//  })
