const express = require('express');
const app = express();

// app.get()
// app.post()
// app.put()
// app.delete()

const courses = [ 
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
]

// '/' defines the path, res.send stands for the response send...

app.get('/', (req, res) => {
    res.send("Home page")
})


app.get('/api/courses', (req, res) => {
    res.send(courses);
})

// ':id' is a parameter or params, req.query is query parameter

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
})



// setting a port both for Hosting platform and a local 3000 port

const port = process.env.PORT || 3000;

app.listen(port, ()=> {console.log(`App listening on port ${port}`)})