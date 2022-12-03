const express = require('express');
const path = require('path')
const fs = require('fs')

const app = express();
const port = process.env.PORT || 3000



app.use(function(req, res, next){
  console.log('Today date:'+ new Date())
  next()
})



app.use(function(req, res, next){
  var filepath = path.join(__dirname, "static", req.url)
  fs.stat(filepath, function(err, fileinfo){
    if(err){
      next()
      return
    }
    if(fileinfo.isFile()){
      res.sendFile(filepath)
    }else {
      next()
    }
  })
})

app.use(function(req, res){
  res.status(404)
  res.send('File not Found')
})



app.get('/', (req, res)=> {
  res.send('Welcome to middleware Application')
})



app.listen(port, ()=> console.log(`Server started on http://localhost:${port}`))