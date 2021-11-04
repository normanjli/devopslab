const express = require("express");
const cors = require("cors");
const path = require('path')
const fortunes = []
const app = express();

app.use(cors());
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'ccec597967d94d0e8068ab34290f3624',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.use(express.json()); // When we want to be able to accept JSON.

app.get(`/`, (req,res)=>{
  res.sendFile(path.join(__dirname)`../client/index.html`)
})

app.use(express.static(`client`))

let fortID = 1

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					"Cool shirt!",
					"Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});
app.post("/api/fortune", (req,res)=>{
  let {fortune} = req.body
  let fortuneObj = {
    id:fortID,
    rating:5,
    text:fortune
  }
  fortunes.push(fortuneObj)
  res.status(200).send(fortunes)
  fortID++
})
app.get("/api/fortune",(req,res)=>{
  if (fortunes.length>0){
    res.status(200).send(fortunes[Math.floor(Math.random()*fortunes.length)])
  }else{
    res.status(400).send(`add some fortunes first~`)
  }
})
app.delete(`/api/fortune/:id`, (req,res)=>{
  const {id} = req.params
  let index = fortunes.findIndex(e=>fortunes.id ===+id)
  fortunes.splice(index,1)
  res.status(200).send(`Deletes`)
})
app.put(`/api/fortune/:id`, (req,res)=>{
  const {id} = req.params
  let index =fortunes.findIndex(e=> e.id ===+id)
  if (index===-1){
    res.status(400).send(`cant find`)
  }
  let {type}=req.body
  if (type === `minus`){
    fortunes[index].rating--
      if(fortunes[index].rating<1){
        fortunes.splice(index,1)
        res.status(200).send(`Rating too low Deleted from DataBase`)
        return
      }
    res.status(200).send(fortunes[index])
    return
  }else{
    if(fortunes[index].rating>=10){
      res.status(200).send(fortunes[index])
      return
    }else{
      fortunes[index].rating++
      res.status(200).send(fortunes[index])
      return
    }
  }
})
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`server running on ${port}`));
