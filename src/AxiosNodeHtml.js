const express = require('express')
const axios = require('axios')
const app = express()
var bodyParser = require('body-parser')

const base_url = "http://localhost:3000";
// const base_url = "http://10.104.7.149";



//app.set('views', path.join(__dirname, "/public/views"))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false}))


app.use(express.static(__dirname + '/public'))

app.get('/views/', async(req,res)=>{
   try{
    const respones = await axios.get(base_url + '/views/books')
    res.render("/views/books",{books:respones.data})
   }catch(err){
    console.error(err)
    res.status(500).send('Error')
   }
})

app.get('/views/book/:id',async(req,res)=>{
    try{
        const respones = await axios.get(base_url + '/views/books/' + req.params.id)
        res.render("book",{book:respones.data})
       }catch(err){
        console.error(err)
        res.status(500).send('Error')
       }
})

app.get('/views/create',(req,res)=>{ // show create desktop
    res.render("create")
})

app.post('/views/create',async(req,res)=>{
   try{
    const data = { title: req.body.title , author: req.body.author}
    await axios.post(base_url + '/views/books' ,data)
    res.redirect('/views/')
   }catch(err){
    console.error(err)
    res.status(500).send('Error')
   }
})

app.get('/update/:id',async(req,res)=>{
    try{
        const respones = await axios.get(
            base_url + '/views/books/' + req.params.id) 
            res.render('update',{book: respones.data})
  } catch(err){
      console.error(err)
      res.status(500).send('Error')
    }
})

app.post('/views/update/:id',async(req,res)=>{
   try{
    const data = { title: req.body.title , author: req.body.author}
    await axios.put(base_url + '/views/books/' + req.params.id,data)
    res.redirect('/views/')
   }catch(err){
    console.error(err)
    res.status(500).send('Error')
   }
})

app.get('/views/delete/:id',async(req,res)=>{
   try{
    await axios.delete(base_url + '/views/books/' + req.params.id)
    res.redirect('/views/')
   }catch(err){
    console.error(err)
    res.status(500).send('Error')
   }
})

app.listen(5500,()=> console.log(`Listening on port 5500`))