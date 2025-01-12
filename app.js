// Import Express
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Define a route
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Tutorial');
});

app.get("/form", (req, res) => {
    res.render("index.html");
});

app.post('/submit', (req, res) => {

    const errors = [];
    const fname = req.body.fname;

    if (!fname || fname.length < 5) {
        errors.push("Valid first name is required.");
    }

    const lname = req.body.lname;
    if (!lname || lname.length < 5) {
        errors.push("Valid last name is required.");
    }

    const color = req.body.color;
    const agree = req.body.agree;
    if (!agree) {
        errors.push("Accepting terms is required.");
    }
    const formData = {
        fname: fname,
        lname: lname,
        color: color,
        agree: agree,
        errors: errors
    }
    if (errors.length == 0) {
        res.render("result.ejs", { formData: formData });
    } else {
        res.render("errors.ejs", { errors: errors });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});