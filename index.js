const express = require('express')
const cors = require('cors');
var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g8jgs.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('Hello Assignment_12-Finish')
  })
  
// 

async function run(){
try{
    await client.connect();
   const partsCollection = client.db("computer-parts").collection("parts");
  
   const reviewCollection = client.db("computer-parts2").collection("services");
 

//    all parts show
app.get('/part' ,async(req ,res) =>{
    const query ={};
    const cursor =partsCollection.find(query);
    const parts =await cursor.toArray();
    res.send(parts)
})

app.get('/service' ,async(req ,res) =>{
    const query ={};
    const cursor =reviewCollection.find(query);
    const review =await cursor.toArray();
    res.send(review)
})


// new work


// app.put('/user/:email', async(req,res) =>{
//   const email = req.params.email;
//   const user = req.body;
//   const filter = {email:email};
//   const options ={ upsert:true };
//   const updateDoc = {
//     $set:user,
//   }
//   const result = await userCollection.updateOne(filter , updateDoc , options);
//   const token =jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRET ,  { expiresIn: '1h' })
//   res.send({result, token});
// })




// single parts show
app.get('/part/:id' ,async(req,res ) =>{
    const id =req.params.id;
    const query ={_id:ObjectId(id)};
    const part =await partsCollection.findOne(query);
    res.send(part)
  })
  



}
finally{

}


}



run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})