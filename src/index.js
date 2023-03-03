const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
mongoose.set('strictQuery', true)
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Sagar-functionup:radhaswami123@cluster0.7xlsi.mongodb.net/Rnative?retryWrites=true&w=majority")
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err)) 


app.use('/', route);
app.use('/app',function(req,res){
    res.send("App is running fine")
})

app.listen(process.env.PORT || 4444, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4444))
});
