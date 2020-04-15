const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/appointments', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctorsPortal").collection("appointments");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });

})

//post 
app.post('/addAppointment', (req, res) => {
    const patient = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctorsPortal").collection("appointments");
        collection.insert(patient, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
});




const port = process.env.PORT || 3000
app.listen(port, () => console.log(`index.js listening at http://localhost:${port}`))