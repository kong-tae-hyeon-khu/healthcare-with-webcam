const express = require('express');
const ejs = require('ejs')

const app = express();
const port = 3000


app.set('port', port)
app.set('view engine', 'ejs')
app.engine('html',ejs.renderFile )


app.get('/', (req,res) => {
    app.set('views', __dirname + '/views/mainPage')
    res.render('main.html')
})

app.get('/squart', (req,res) => {
    app.set('views', __dirname + '/views/squartPage')
    res.render('squart.html')
})

app.listen(port, () => {
    console.log(`Listening on ${port} port`);
})