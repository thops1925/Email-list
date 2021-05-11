const express = require('express')
const https = require('https')
const app = express()
require('dotenv').config()


app.use(express.urlencoded({extended: false}))
app.use(express.static('Public'))

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/signUp.html')
})


app.post('/',(req,res)=>{
   const fname = req.body.fname
   const lname = req.body.lname
   const email = req.body.email

      
   const apiKey = process.env.APIKEY
   const url =  process.env.URL

    
    const data = {
        members : [{
            email_address: email,
            status:'subscribed',
            merge_fields:{
                 FNAME: fname,
                 LNAME:lname
            }
        }]
    }

    const jsonData = JSON.stringify(data)

    const options = {
        method : 'POST',
        auth : 'Thops:'+apiKey+''
    }

    const request = https.request(url,options , (response) => {
        
        if(response.statusCode===200){
            res.sendFile(__dirname + '/success.html')
        }else{
            res.sendFile(__dirname + '/fail.html')
        }
        response.on('data',(data)=>{  
        })
      })
    
    request.write(jsonData)
    request.end()
    // console.log(request)
})

app.post('/fail.html',(req,res)  => {
    res.redirect('/')   
})


app.listen(process.env.PORT || 3000,() => {
    console.log('The server is running')
})
