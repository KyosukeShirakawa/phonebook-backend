const express = require('express')
const app = express()
const morgan = require('morgan')
const logger = morgan('tiny')


app.use(express.json())
app.use(morgan('tiny'))



// morgan.token('json', function(req, res) {
//   return JSON.stringify({
//     id: req.id,
//     name: req.name,
//     number: req.number
//   })
// })



// morgan.token('param', function(req, res, param) {
//   return req.params[param]
// })


let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]



app.get('/info', (request, response) => {
  const currentDate = new Date()
  response.send(`<p>Phonebook has info for 2 people</p><p>${currentDate}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id ===id)

  if(person){
    response.json(person)
  }else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

const generateId = () => {
  const randomNum = Math.random().toString(36).substring(2, 9)


  return randomNum
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  } else if(persons.find(p => p.name ===body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})




const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)