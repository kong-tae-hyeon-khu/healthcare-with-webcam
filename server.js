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


// js 파일 전송.
app.get('/main.js', (req,res) => {
    res.sendFile( __dirname + '/views/mainPage/main.js')
})

app.get('/squart', (req,res) => {
    app.set('views', __dirname + '/views/squartPage')
    res.render('squart.html')
})

app.listen(port, () => {
    console.log(`Listening on ${port} port`);
})