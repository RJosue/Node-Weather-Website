const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

//utils modules

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Raúl Gómez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Raúl Gómez"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "Raúl Gómez",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Missing argument address'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({error})
        } else {
            forecast(latitude, longitude, (error, { temperature, fellslike }) => {
                if (error) {
                    res.send({error})
                } else {
                    return res.send({
                        temperature,
                        fellslike,
                        location
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: ""
    })
})

// 404 Page

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        message: 'Help article not found',
        name: "Raúl Gómez"
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        message: 'My 404 Page',
        name: "Raúl Gómez"
    })
})

// Server
app.listen(3000, () => {
    console.log('server is up on port 3000.')
})