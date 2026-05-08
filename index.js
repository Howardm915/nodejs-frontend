const express = require('express')
const setupProxy = require('./src/setupProxy');
const path = require('path')
const app = express()


// serving react app
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/env-config.js', (req, res) => {
        res.type('application/javascript');
        res.send(
            `window.env = ${JSON.stringify({
                COMPONENT_BACKEND_URL: process.env.COMPONENT_BACKEND_URL || '',
                // add whatever other vars the React app reads from window.env
            })};`
        );
    });


app.get('/env-config.js', (req, res) => {
        res.type('application/javascript');
        res.send(
            `window.env = ${JSON.stringify({
                COMPONENT_BACKEND_URL: process.env.COMPONENT_BACKEND_URL || '',
                // add whatever other vars the React app reads from window.env
            })};`
        );
    });

setupProxy(app);



var port = '8080'
if (process.env.FRONTEND_PORT) {
    port = process.env.FRONTEND_PORT;
}

app.listen(port)

