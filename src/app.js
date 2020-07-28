const path = require('path')
const express = require('express')
const app = express() // Load Express after the NPM has been insalled
const hbs = require('hbs')
const { DH_NOT_SUITABLE_GENERATOR } = require('constants')
const { response } = require('express')
const geocode = require('./utility/geocode')
const forcast = require('./utility/forcast')

const port = process.env.PORT || 3000 //for heroku

// Define paths forExpress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views') //Point hbs to the correct path with renamed folder
const partialPath = path.join(__dirname, '../templates/partials') //Point to the partial folder

// Setup handelbars engine and view location
app.set('view engine', 'hbs') // This load hbs NPM
app.set('views', viewsPath) // This Load the new renamed folder templates 
hbs.registerPartials(partialPath)

// Setup Static Directory
app.use(express.static(publicDirectoryPath)) // For a static webpage

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Simone Di Fonzo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Simone Di Fonzo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Simone Di Fonzo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

    forcast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })

        })
    }) 
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You Must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'simone',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { 
    res.render('404', {
        title: '404',
        name: 'simone',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)    
})
