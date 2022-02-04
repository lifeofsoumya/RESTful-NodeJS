const express = require('express');
const app = express();

const Joi = require('joi'); //validation dependency


app.use(express.json()); //enabling json middleware

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

// viewing results of api

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

// posting something on api

app.post('/api/courses', (req, res) =>{

    const schema ={
        name: Joi.string().min(3).required() //joi syntax for checking if name is string, has 3 char, required
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) // or use manual validation '!req.body.name || req.body.name.length <2'
    {   res.status(400).send(result.error.details[0].message); // simplifying error output
        return;
    }

    const course = {
        id: courses.length + 1, //assigning an id manually as we're not using database
        name: req.body.name // req.body object allows you to access data in a string or JSON object from the client side
    };
    courses.push(course); // pushing the course object in courses array
    res.send(course); //letting client know the id of new object after submission
})


// finding someone on api using parameter
// ':id' is a parameter or params, req.query is query parameter

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id)); 
    // compares if the courses array has the id with the requested id
    
    if (!course) res.status(404).send('The course with given ID was not found')
    // if previous comparison is not true, return a status of 404 and send response text

    res.send(course);
    // else response with course
})


// updating someone on api

app.put('/api/courses/:id', (req, res) => {

     // looking if id exists, logic explained previously
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with given ID was not found')


     // validating submission, previously explained in post
    const schema ={
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) // 
    {   res.status(400).send(result.error.details[0].message); 
        return;
    }

    //updating info
    course.name = req.body.name;

    // returning updated info
    res.send(course);
})



// setting a port both for Hosting platform and a local 3000 port

const port = process.env.PORT || 3000;

app.listen(port, ()=> {console.log(`App listening on port ${port}`)})