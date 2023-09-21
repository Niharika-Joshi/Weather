const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const express = require('express')
const path=require('path')
console.log(__dirname)
console.log(path.join(__dirname,"../public"))
const app = express()
const publicDir=path.join(__dirname,"../public")

const partialsPath=path.join(__dirname,'partials')

app.set('view engine','hbs')

hbs.registerPartials(partialsPath)

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About me',
        name:'niharika'
    })
})

app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'weather',
        name:'niharika'
    })
})


app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        title:'HELP',
        name:'niharika'
    })
})


app.use(express.static(publicDir))
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})


// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew'
//     }, {
//         name: 'Sarah'
//     }])
// })

// app.get('/about', (req, res) => {
//     //res.send('<h1>About</h1>')
    
// })

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send(
            {
                error:'YOU MUST PROVIDE AN ADDRESS'
            }
        )
    }

        geocode(req.query.address,(error,{lat,long,location}={})=>
        {
            if(error)
            {
                return res.send({error:error})
            }
    
            // console.log('error',error)
            // res.send({
            //     address:req.query.address
            // })
            forecast(lat,long, (error, forecastData) => {
                if(error)
                {
                    return res.send(error)
                }   
                res.send({
                    forecast: forecastData,
                    location:location,
                    address: req.query.address
              })
        })
    

})
})

 

//     ename:'HELPARTICLE'
// })})


//for404

app.get('/help/*',(req,res)=>{
    res.render('404.hbs',{
        ename:"HELP",
        name:"Niharika"
    })
})


app.get('*',(req,res)=>{
    res.render('404.hbs',{
        ename:"PAGE",
        name:"Niharika"
    })
})


// app.get('*',(req,res)=>
// {
//     res.render{
//         ename:'PAGE'
//     })
// })

app.listen(8080, () => {
    console.log('Server is up on port 8080.')
})