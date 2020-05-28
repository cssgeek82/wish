const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

// Route
const posts = require('./routes/api/posts');   

app.use('/api/posts', posts); 

// Handle production
if(process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static(__dirname + '/public'));

    // Handle SPA (single page application)
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));  // refers to any route at all
}

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Servern startad på port ${port}`));