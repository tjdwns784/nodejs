// 라이브러리 가져오기 - import
var express = require('express');

// express 실행
var app = express();
app.listen(3000, function() {
    console.log('connect');
});
// public 하위의 파일들은 app.get 또는 app.post를 거치지 않게끔 처리.
app.use(express.static('public'));

//                 요청, 응답                
//var f = function(req, res) {
//    console.log('/ connect!!!!');
//    res.send('<h1>왕자</h1>');
//}
//app.get('/',f);


app.get('/', function(req, res) {
    console.log('/ connect!!!!');
    // 응답 response
    res.send('<h1>왕자</h1>');
});



//app.get('/', (req, res) => {
//    console.log('/ connect!!!!');
    // 응답 response
//    res.send('<h1>왕자</h1>');
//});
// 3개 다 똑같음.
// -----------------------------------------------------
app.get('/main', function(req, res) {
    // Temlplate 활용
    res.sendFile(__dirname + '/public/main.html');
    // ejs jade 
    // res.render()
});

app.set('view engine', 'ejs');
app.set('views', './views');
// 아래 ejs 템플릿을 사용하기 위해서는 설정 필요
// npm install ejs --save
app.get('/email', function(req, res){
    var name = req.param('name'); // param: 쿼리스트링값  : 물음표 뒤에 값을 말함. 추출
    //             파일명  ,   json
    res.render('email.ejs',{'name':name});
});


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


var mysql = require('mysql');
app.post('/signup', (req, res)=>{
    var uid = req.body.uid;
    var upw = req.body.upw;
    console.log(uid, upw);

    var conn = mysql.createConnection({
        host:'localhost',
        user: 'root',
        password: 'mysql',
        database: 'nodedb'
    })
    conn.connect();
    conn.query(
        `INSERT INTO USERS (UID, UPW, REGDATE)
            VALUES('${uid}','${upw}', NOW())`, function(err, rows){

    });
    res.send('ok');
});