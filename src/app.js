const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engin and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res)=>{
    res.render('index',{
      title:'Weather',
      name:'Lasal'  
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
      helpText: 'This is some helpful text',
      title:'Help',
      name:'Lasal'  
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
      title:'About Me',
      name:'Lasal'  
    })
})


// app.get('/weather',(req,res)=>{ 
//     if(!req.query.address){
//       return res.send({
//         error:'You must provide an address!'
//       })
//     }
//       res.send({
//         location:'Galle',
//         forecast:'Sunny',
//         address: req.query.address
//     }) 

// })


app.get('/weather',(req,res)=>{ 
  if(!req.query.address){
    return res.send({
      error:'You must provide an address!'
    })
  }
  //   res.send({
  //     location:'Galle',
  //     forecast:'Sunny',
  //     address: req.query.address
  // })
  
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({
        error:'You must provide an address!'
      })
    }
  
    forecast(latitude,longitude, (error, forecastData) => {
        if(error){
          return res.send({
            error:'You must provide an address!'
          })
        }
        // console.log(location)
        // console.log(forecastData)
        res.send({
          location:location,
          forecast:forecastData,
          address: req.query.address
        })
      })
    
    }) 


})




app.get('/products',(req,res)=>{
  if(!req.query.search){
      return res.send({
        error:'You must provide a search term'
      })
  }
  console.log(req.query.search)
  res.send({
    products:[]
     
  })
})




app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:404,
    errorMessage:'Help article not found',
    name:'Lasal'  
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:404,
    errorMessage:'Page not found',
    name:'Lasal'  
  })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})