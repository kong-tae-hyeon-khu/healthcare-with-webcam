const express = require('express');

const ejs = require('ejs')

const app = express();


const port = 3000


app.set('port', port)
app.set('view engine', 'ejs')
app.engine('html',ejs.renderFile )

// model/user.js
const { User } = require('./model/User');
const mongoose = require('mongoose');
// db 연결을 위한 키 값 , 보안을 위해 최종 마스터 브런치에는 포함하지 않을 예정. 
mongoose.connect('mongodb+srv://kongtae:ksas9825!%40@squartusers.e2ddc.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB connect!'))
.catch(err => console.log(err))

// 로그인 세션 : 로그인 정보 유지.
const express_session = require('express-session')
app.use(express_session({
    secret : "@secret@number", // 암호화 키
    resave : false,
    saveUninitialized : false,
    store:require('mongoose-session')(mongoose),
    cookie : {maxAge :  60*60*24}
}))


app.get('/', (req,res) => {
    console.log(req.session)
    if (req.session.user)
    {
        app.set('views', __dirname + '/views/squartPage')
        res.render('squart.html')
    }
    else
    {
        app.set('views', __dirname + '/views/mainPage')
        res.render('main.html')
    }

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



// 유저 등록 및 로그인 API




// 등록 .
app.use(express.json())
app.post('/api/users/register', (req,res) => {
    const new_user = new User(req.body);
    new_user.save((err, userInfo) => {
        if (err) return res.json({ successs : false, err})
        return res.status(200).json({
            success : true
        })
    })
})

// 로그인 .
app.post('/api/users/login', (req ,res) => {
    console.log(req.body)
    User.findOne({name : req.body.name}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message : "이름이 일치하는 사용자가 없습니다 !",
            })
        }
        else if (req.body.password === user.password) {
            req.session.user = {
                user_name : req.body.name,
                user_password : req.body.password,
            }
            req.session.save()
            
            console.log(req.session.user)
            return res.json({
                loginSuccess : true,
            })
        }
        else {
            return res.json({
                loginSuccess : false,
                message : "비밀번호가 일치하지 않습니다 !"
            })
        }
    })
})

// 로그아웃
app.get('/api/users/logout', (req,res) => {
    var session = req.session
    if (session.user)
    {
        req.session.destroy(err => {
            if (err) {
                console.log(err)
                return res.json({
                    logoutSuccess : false
                })
            }
            else
            {
                console.log('로그아웃 완료')
                return res.json({
                    logoutSuccess : true
                })
            }
        })
        // res.redirect('/');
    }
    else
    {    
        console.log('로그인이 되어있지 않습니다.')
        return res.json({
            logoutSuccess : true,
        })
    }
        
})





// 세션 저장 확인
app.get('/api/session', (req,res) => {
    console.log(req.session.user)
    return res.json({session :req.session})
})
