import  express from 'express';

var app = express();

app.use(express.static('public'));

app.set('view engine','ejs');


app.listen(3000, function listenHandler(){
  console.info('Running on port ${3000}');
});
